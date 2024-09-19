from django.db import models
from memory.datasets import categories
# Create your models here.


class Category(models.Model):
    """
    Tis model represents a
    category object.
    """
    title = models.CharField(max_length=50, verbose_name='Category')

    class Meta:
        verbose_name  = 'Category'
        verbose_name_plural = 'Categories'
    
    def __str__(self):
        return self.title
        

class Task(models.Model):
    """
    This model represents an
    abstract task interface.
    """
    title = models.CharField(max_length=255, verbose_name='Task title')
    description = models.TextField(verbose_name='Description', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creation date')
    is_completed = models.BooleanField(default=False, verbose_name='Completion state')
    priority =  models.CharField(max_length=30, choices=[('high', 'high'), ('moderate', 'moderate'), ('minor', 'minor')])
    
    class Meta:
        abstract = True
    
    def __str__(self):
        return f'#{self.pk} {self.title}'


class SimpleTask(Task):
    """
    This model represents a
    regular standalone task
    object.
    """
    category = models.ForeignKey(Category, on_delete=models.PROTECT, verbose_name='Category', null=True, blank=True)
    due_date = models.DateTimeField(verbose_name='Should be finished by', null=True, blank=True)
    
    class Meta:
        verbose_name = 'Simple Task'
        verbose_name = 'Simple Tasks'


class Project(models.Model):
    """
    This model represents a
    project object.
    """
    title = models.CharField(max_length=256, verbose_name='Project title')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creation date')
    
    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
    
    def __str__(self):
        return f'#{self.pk} {self.title}'
        

class Sprint(models.Model):
    """
    This model represents a
    chunk of time within which
    the tasks can be managed.
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='Included to project: ')
    started_at = models.DateTimeField(verbose_name='Start date')
    ends_at = models.DateTimeField(verbose_name='Finish date')
    
    class Meta:
        verbose_name = 'Sprint'
        verbose_name_plural = 'Sprints'
        
    def __str__(self):
        return f'# {self.pk} Sprint for project "{self.project.title}".'
        

class SprintTask(Task):
    """
    This model extends the
    task which the sprint
    contains
    """
    sprint = models.ForeignKey(Sprint, on_delete=models.CASCADE, verbose_name='Included to sprint')

    class Meta:
        verbose_name = 'Sprint Task'
        verbose_name_plural = 'Sprint Tasks'