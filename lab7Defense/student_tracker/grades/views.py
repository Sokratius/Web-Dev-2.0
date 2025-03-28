from django.shortcuts import render
from .models import Student
# Create your views here.

def student_list(request):
    students = Student.objects.all()
    student_data = []

    for student in students:
        avg_score = student.get_average_score()
        student_data.append({
            'name': student.name,
            'average': round(avg_score, 2),
        })

    return render(request, 'grades/student_list.html', {'students': student_data})
