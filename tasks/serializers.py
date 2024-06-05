from rest_framework import serializers
from .models import Task, Category


class TasksListSerializer(serializers.ModelSerializer):
    """
    Prepare and serialize
    the fields of the task
    for list representation.
    """
    category = serializers.CharField(source='category.title')
    status = serializers.SerializerMethodField('get_status')
    class Meta:
        model = Task
        fields = [
            'pk',
            'category',
            'title',
            'date_published',
            'status'
        ]
    
    def get_status(self, obj):
        return 'active' if obj.is_active else 'inactive'
    

class TaskCreationSerializer(serializers.ModelSerializer):
    """
    Serialize fields for
    task creation.
    """
    class Meta:
        model = Task
        fields = [
            'title',
            'description'
        ]


class TaskDetailSerializer(serializers.ModelSerializer):
    """
    Prepare & serialize data for either
    task observation or update.
    """
    status = serializers.SerializerMethodField('get_status')
    category = serializers.CharField(source='category.title')
    class Meta:
        model = Task
        fields = [
            'category',
            'title',
            'description',
            'date_published',
            'status'
        ]
    
    def get_status(self, obj):
        return 'active' if obj.is_active else 'inactive'