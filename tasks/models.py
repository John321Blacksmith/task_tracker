from django.db import models

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
        
    def get_category(self, dataset: dict[str, set]) -> str | None:
        stats = {k: len(self.literal_data & v) for k, v in dataset.items()}
        tups = [(k, v) for k, v in stats.items() if v > 0]
        if len(tups) > 0:
            possible_category = tups[0]
            for i in range(0, len(tups)):
                if tups[i][1] > possible_category[1]:
                    possible_category = tups[i]
            return possible_category[0]
        return None
        
    @property
    def literal_data(self) -> set:
        all_literals = set()
        for l in [f.split(' ') for f in self.__dict__.values() if isinstance(f, str)]:
            for w in l:
                all_literals.add(w)
        return all_literals
    
    def save(self):
        category = self.get_category(...)
        if category:
            self.category = Category.objects.get_or_create(title=category)[0]
        else:
            self.category = Category.objects.get_or_create(title='other')[0]
    
        return super().save()