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
    class Meta:
        model = SimpleTask
        fields = '__all__'
        

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