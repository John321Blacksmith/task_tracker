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
            'id',
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
    
    class Meta:
        model = SimpleTask
        fields = '__all__'
        
    def get_categories(self, obj):
        return [
            dict(cat) for cat in \
                CategorySerializer(Category.objects.all(), many=True).data
        ]


class SimpleTaskFormSerializer(serializers.ModelSerializer):
    """
    Serializer for simple task
    form.
    """
    class Meta:
        model = SimpleTask
        fields = [
            'title',
            'description',
            'category',
            'due_date',
            'is_completed',
            'priority'
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