from django.db import models
from datasets import categories
# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=50)

    class Meta:
        verbose_name  = 'category'
        verbose_name_plural = 'categories'
        

class Task(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    date_published = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = 'task'
        verbose_name_plural = 'tasks'
        
    @property
    def literal_data(self) -> set:
        all_literals = set()
        for l in [f.split(' ') for f in self.__dict__.values() if isinstance(f, str)]:
            for w in l:
                all_literals.add(w.lower())
        return all_literals
    
    def get_category(self, dataset: dict[str, set[str]]) -> str | None:
        
        object_set = set() # only the contained patterns
        for cat in dataset.keys():
            for lit_v in self.literal_data:
                if len(lit_v) > 2:
                    for pattern in dataset[cat]:
                        if pattern in lit_v:
                            object_set.add(pattern)
        # the pattern comp is then compared again
        stats = {k: len(object_set & v) for k, v in dataset.items()} # record stats
        tups = [(k, v) for k, v in stats.items() if v > 0] # tuples for sorting stats
        
        if len(tups) > 0:
            possible_category = tups[0]
            for i in range(0, len(tups)):
                if tups[i][1] > possible_category[1]:
                    possible_category = tups[i]
            return possible_category[0]
        return None
        
    def save(self, *args, **kwargs):
        category = self.get_category(categories)
        try:
            self.category = Category.objects.get(title=category)
        except Category.DoesNotExist:
            self.category = Category.objects.get_or_create(title='other')[0]

        super().save(*args, **kwargs)