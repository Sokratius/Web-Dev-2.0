from django.urls import path
from . import views

urlpatterns = [
    path('universities/', views.UniversityList.as_view()),
    path('universities/<int:pk>/', views.UniversityDetail.as_view()),
    path('internships/', views.InternshipList.as_view()),
    path('internships/<int:pk>/', views.InternshipDetail.as_view()),
    path('university/<int:university_id>/internships/', views.InternshipsByUniversity.as_view()),
    path('internships/top_ten/', views.TopTenInternships.as_view()),
]