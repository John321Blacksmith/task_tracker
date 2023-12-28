from rest_framework import serializers
from .models import Task, Category


class TasksListSerializer(serializers.ModelSerializer):
    """
    Prepare and serialize
    the fields of the task
    for list representation.
    """
    category = serializers.SerializerMethodField('get_category_title')
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
    
    def get_category_title(self, obj):
        return obj.category.title
    

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
    category = serializers.SerializerMethodField('get_category_name')
    class Meta:
        model = Task
        fields = [
            'category',
            'title',
            'description',
            'date_published',
            'status'
        ]
    
    def get_category_name(self, obj):
        return obj.category.title
    
    def get_status(self, obj):
        return 'active' if obj.is_active else 'inactive'