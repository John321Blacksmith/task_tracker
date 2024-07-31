from rest_framework import serializers
from .models import (
    SimpleTask, Project,
    Sprint, SprintTask,
    Category
)


class CategorySerializer(serializers.ModelSerializer):
    """
    Category object JSON
    representation.
    """
    class Meta:
        model = Category
        fields = [
            'pk',
            'title'
        ]


class SimpleTaskListSerializer(serializers.ModelSerializer):
    """
    Prepare and serialize
    the fields of the task
    for list representation.
    """
    category = serializers.CharField(source='category.title', read_only=True)

    class Meta:
        model = SimpleTask
        fields = [
            'id',
            'title',
            'category',
            'created_at',
            'is_completed',
            'priority',
        ]


class SimpleTaskSerializer(serializers.ModelSerializer):
    """
    Represent explicit data of the
    simple task object.
    """
    categories = serializers.SerializerMethodField('get_categories')
    category = serializers.CharField(source='category.title', read_only=True)
    
    class Meta:
        model = SimpleTask
        fields = '__all__'
        
    def get_categories(self, obj):
        return [
            dict(cat) for cat in \
                CategorySerializer(Category.objects.all(), many=True).data
        ]


class SimpleTaskFormSerializer(serializers.Serializer):
    """
    Serializer for simple task
    form.
    """
    title = serializers.CharField(max_length=256, required=True)
    description = serializers.CharField(max_length=256, required=True)
    category = serializers.CharField(max_length=64, required=True)
    due_date = serializers.DateTimeField(format='%Y-%m-%d', required=True)
    is_completed = serializers.BooleanField(default=False)
    priority = serializers.CharField(required=True)


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