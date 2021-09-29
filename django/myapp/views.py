from django.shortcuts import render
from rest_framework.generics import ListAPIView, CreateAPIView,UpdateAPIView,RetrieveAPIView,DestroyAPIView
from rest_framework.permissions import AllowAny
from .models import Student
from .serializer import StudentSerializer

class StudentsViewSet(ListAPIView):
    model = Student
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (AllowAny, )

class StudentsDetailSet(RetrieveAPIView):
    model = Student
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (AllowAny, )

class StudentsCreateSet(CreateAPIView):
    model = Student
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (AllowAny, )

class StudentsUpdateSet(UpdateAPIView):
    model = Student
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (AllowAny, )

class StudentsDeleteSet(DestroyAPIView):
    model = Student
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (AllowAny, )