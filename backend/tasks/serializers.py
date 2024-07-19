from rest_framework import serializers
from .models import (
    SimpleTask, Project,
    Sprint, SprintTask
)


class SimpleTasksListSerializer(serializers.ModelSerializer):
    """
    Prepare and serialize
    the fields of the task
    for list representation.
    """
    category = serializers.CharField(source='category.title', write_only=True)
    due_date = serializers.DateTimeField(format='%Y-%m-%d')
    class Meta:
        model = SimpleTask
        fields = [
            'id',
            'title',
            'description',
            'category',
            'created_at',
            'due_date',
            'is_completed',
            'priority',
        ]
        

class ProjectSerializer(serializers.ModelSerializer):
    """
    
    """
    class Meta:
        model = Project
        fields = '__all__'


class SprintSerializer(serializers.ModelSerializer):
    """
    
    """
    class Meta:
        model = Sprint
        fields = '__all__'
        
        
class SprintTaskSerializer(serializers.ModelSerializer):
    """
    
    """
    class Meta:
        model = SprintTask
        fields = '__all__'