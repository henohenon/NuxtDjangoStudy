from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    course = models.CharField(max_length=100)
    rating = models.IntegerField()

    def __str__(self):
      return self.name

    class Meta:
        ordering = ['name']
