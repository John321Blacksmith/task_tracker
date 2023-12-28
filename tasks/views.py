from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.generics import GenericAPIView, RetrieveUpdateDestroyAPIView
from .models import Task
from .serializers import TasksListSerializer, TaskDetailSerializer, TaskCreationSerializer

# Create your views here.

class TasksListAPIView(GenericAPIView):
    """
    This view represents a
    list of tasks with the
    defined fields.
    """
    queryset = Task.objects.all()
    serializer_class = TasksListSerializer
    renderer_classes = [JSONRenderer]
    
    
    def get(self, request, *args, **kwargs):
        tasks = self.get_queryset()
        serializer = self.serializer_class(tasks, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        serializer = TaskCreationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    

class TaskDetailAPIView(RetrieveUpdateDestroyAPIView):
    """
    This view shows up a task
    and facilitates RUD methods
    """
    queryset = Task.objects.all()
    renderer_classes = [JSONRenderer]
    serializer_class = TaskDetailSerializer