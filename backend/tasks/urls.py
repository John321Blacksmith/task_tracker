from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()

app_name = 'tasks'

router.register(r'simple-tasks', views.SimpleTaskViewSet, basename='simple-task')
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'sprints', views.SprintViewSet, basename='sprint')
router.register(r'sprint-tasks', views.SprintTaskViewSet, basename='sprint-task')

urlpatterns = [
    path('', include(router.urls))
]