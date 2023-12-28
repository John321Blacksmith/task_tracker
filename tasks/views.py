from django.http import Http404
from rest_framework.renderers import JSONRenderer
from rest_framework.mixins import ListModelMixin
from rest_framework.generics import GenericAPIView
from .models import Task, Category
from .serializers import TasksListSerializer

# Create your views here.

class TasksListAPIView(ListModelMixin, GenericAPIView):
    """
    This view represents a
    list of tasks with the
    defined fields.
    """
    queryset = Task.objects.all()
    renderer_classes = [JSONRenderer]
    serializer_class = TasksListSerializer
    
    def get(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)