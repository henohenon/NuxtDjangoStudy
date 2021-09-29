from django.urls import path
from .views import StudentsViewSet, StudentsCreateSet, StudentsUpdateSet,StudentsDetailSet,StudentsDeleteSet

urlpatterns = [
    path('get_myapp/', StudentsViewSet.as_view()),
    path('get_myapp/<int:pk>/', StudentsDetailSet.as_view()),
    path('post_myapp/', StudentsCreateSet.as_view()),
    path('put_myapp/<int:pk>/', StudentsUpdateSet.as_view()),
    path('delete_myapp/<int:pk>/', StudentsDeleteSet.as_view()),
]