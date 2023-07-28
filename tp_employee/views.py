from tp_employee.models import *
from tp_employee.serializers import *
from rest_framework import generics
from rest_framework import filters
from django.http import FileResponse
from django.shortcuts import get_object_or_404
import requests



class EmployeeList(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    print(queryset,"EmployeeList")


class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    print(queryset,"Employeedetail")



class EmployeeListView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['emp_name','emp_id', 'emp_mail','designation', 'doj', 'dob' ]

class EmployeeListViewName(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['emp_name']


class EmployeeListViewID(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['emp_id']


class EmployeeListViewDesg(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['designation']

class UploadList(generics.ListCreateAPIView):
    queryset = Upload.objects.all()
    serializer_class = UploadSerializer


class UploadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = UploadSerializer    

  


   
