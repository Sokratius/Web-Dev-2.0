from django.contrib import admin
from .models import University, Internship

# Register your models here.

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'city')
    search_fields = ('name', 'city')

@admin.register(Internship)
class InternshipAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'stipend', 'university')
    list_filter = ('university',)
    search_fields = ('title',)