from django.shortcuts import render
from rest_framework import generics
from .models import University, Internship
from .serializers import UniversitySerializer, InternshipSerializer

# Create your views here.

class UniversityList(generics.ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class UniversityDetail(generics.RetrieveAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class InternshipList(generics.ListAPIView):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer

class InternshipDetail(generics.RetrieveAPIView):
    queryset =  Internship.objects.all()
    serializer_class = InternshipSerializer

class InternshipsByUniversity(generics.ListAPIView):
    serializer_class = InternshipSerializer

    def get_queryset(self):
        university_id = self.kwargs['university_id']
        return Internship.objects.filter(university_id=university_id)

class TopTenInternships(generics.ListAPIView):
    serializer_class = InternshipSerializer

    def get_queryset(self):
        return Internship.objects.order_by('-stipend')[:10]
