from rest_framework import serializers
from .models import University, Internship

class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = '__all__'

class UniversitySerializer(serializers.ModelSerializer):
    internships = InternshipSerializer(many=True, read_only=True)

    class Meta:
        model = University
        fields = '__all__'