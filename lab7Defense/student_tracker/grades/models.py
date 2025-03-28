from django.db import models

# Create your models here.

class Student(models.Model):
    name = models.CharField(max_length=100)
    scores = models.JSONField()

    def get_average_score(self):
        return sum(self.scores) / len(self.scores) if self.scores else 0

    @classmethod
    def get_top_score(cls):
        students = cls.objects.all()
        top = max(students, key=lambda s: s.get_average_score(), default=None)

    def __str__(self):
        return self.name