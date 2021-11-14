from django.urls import path
from EmployeeApp import views
from rest_framework.urlpatterns import format_suffix_patterns

app_name = 'EmployeeApp'
urlpatterns = [
    path(app_name, views.Employee.as_view()),
    path('departments/<int:pk>/',views.Employee.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)