from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from .models import SimpleTask, Project, Sprint, SprintTask
from .serializers import (
    SimpleTasksListSerializer, ProjectSerializer,
    SprintSerializer, SprintTaskSerializer
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
        'priority',
        'is_completed'
    ]
    
    


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