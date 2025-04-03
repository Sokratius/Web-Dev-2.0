from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Company, Vacancy


# Companies 
def company_list(request):
    companies = list(Company.objects.values())
    return JsonResponse({'companies': companies})

def company_detail(request, id):
    company = get_object_or_404(Company, id=id)
    return JsonResponse({
        'id': company.id,
        'name': company.name,
        'description': company.description,
        'city': company.city,
        'address': company.address
    })
    
def company_vacancies(request, id):
    company = get_object_or_404(Company, id=id)
    vacancies = list(company.vacancy_set.values())
    return JsonResponse({'company': company.name, 'vacancies': vacancies})




# Vacancies

def vacancy_list(request):
    vacancies = list(Vacancy.objects.values())
    return JsonResponse({'vacancies': vacancies})

def vacancy_detail(request, id):
    vacancy = get_object_or_404(Vacancy, id=id)
    return JsonResponse({
        'id': vacancy.id,
        'name': vacancy.name,
        'description': vacancy.description,
        'salary': vacancy.salary,
        'company': vacancy.company.name
    })
    
def vacancy_top(request):
    vacancies = list(Vacancy.objects.order_by('-salary')[:10].values())
    
    return JsonResponse({'vacancies': vacancies})

