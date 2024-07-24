from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, SimpleTask, Project, Sprint, SprintTask
from .serializers import (
    SimpleTasksListSerializer, ProjectSerializer,
    SprintSerializer, SprintTaskSerializer,
    CategorySerializer
)

# Create your views here.

class SimpleTaskViewSet(ModelViewSet):
    """
    This view facilitates
    management over the
    tasks.
    """
    queryset = SimpleTask.objects.all()
    serializer_class = SimpleTasksListSerializer
    renderer_classes = [JSONRenderer]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'title',
        'due_date',
        'category',
        'priority',
        'is_completed'
    ]
    
    def list(self, request, *args , **kwargs):
        """
        Overwritten list representaion
        method which returns a response
        with a list of simple tasks and
        one, and only one set of categories.
        """
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        
        categories_serializer = CategorySerializer(Category.objects.all(), many=True)
        
        if page is not None:
            tasks_serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(
                data={
                    'tasks': tasks_serializer.data,
                    'categories': categories_serializer.data
                    }
                )
        
        tasks_serializer = self.get_serializer(queryset, many=True)
        
        return Response(data={'tasks': tasks_serializer.data, 'categories': categories_serializer.data})
    

class ProjectViewSet(ModelViewSet):
    """
    This view facilitates
    management over the
    projects.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    renderer_classes = [JSONRenderer]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['created_at']
    
    
class SprintViewSet(ModelViewSet):
    """
    This view facilitates
    management over the
    sprints.
    """
    queryset = Sprint.objects.all()
    renderer_classes = [JSONRenderer]
    serializer_class = SprintSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['started_at', 'ends_at']
    
    
class SprintTaskViewSet(ModelViewSet):
    """
    This view facilitates
    management over the
    sprint tasks.
    """
    queryset = SprintTask.objects.all()
    renderer_classes = [JSONRenderer]
    serializer_class = SprintTaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'title',
        'description',
        'created_at',
        'priority',
        'is_completed'
    ]