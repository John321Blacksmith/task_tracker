from django.contrib import admin
from .models import Category, SimpleTask, Project, Sprint, SprintTask
        

# Register your models here.

admin.site.register(Category)
admin.site.register(SimpleTask)
admin.site.register(Project)
admin.site.register(Sprint)
admin.site.register(SprintTask)