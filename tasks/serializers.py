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