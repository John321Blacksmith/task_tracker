from django.urls import path
from . import views


app_name = 'tasks'
urlpatterns = [
    path('', views.TasksListAPIView.as_view()),
    path('<int:pk>/', views.TaskDetailAPIView.as_view()),
]