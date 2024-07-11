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
    description = models.TextField(verbose_name='Description')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creation date')
    is_completed = models.BooleanField(default=False, verbose_name='Completion state')
    priority =  models.CharField(max_length=30, choices=[('high', 'high'), ('moderate', 'moderate'), ('minor', 'minor')])
    
    class Meta:
        abstract = True


class SimpleTask(Task):
    """
    This model represents a
    regular standalone task
    object.
    """
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Category')
    due_date = models.DateTimeField(verbose_name='Should be finished by')
    
    class Meta:
        verbose_name = 'Simple Task'
        verbose_name = 'Simple Tasks'
    
    def __str__(self):
        return f'#{self.pk} {self.title}'


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
        

class Sprint(models.Model):
    """
    This model represents a
    chunk of time within which
    the tasks can be managed.
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='Included to project: ')
    started_at = models.DateTimeField(auto_now_add=True, verbose_name='Start date')
    ends_at = models.DateTimeField(verbose_name='Finish date')
    
    class Meta:
        verbose_name = 'Sprint'
        verbose_name_plural = 'Sprints'
        

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
        
    def __str__(self):
        return f'#{self.pk} {self.title}'