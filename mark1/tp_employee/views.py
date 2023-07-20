from django.shortcuts import render
from rest_framework import viewsets
from . models import Employee
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from . serializers import EmployeeSerializer

class EmployeeViewSet(viewsets.ViewSet):
    
    def list(self,request):
        queryset = Employee.objects.all()
        serializer = EmployeeSerializer(queryset,many = True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = Employee.objects.all()
        employee = get_object_or_404(queryset,pk=pk)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = EmployeeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)
    
    def update(self, request, pk=None):
        instance = Employee.objects.get(pk=pk)
        serializer = EmployeeSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def partial_update(self,request,pk=None):
        instance = Employee.objects.get(pk=pk)
        serializer = EmployeeSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def destroy(self,request,pk = None):
        instance = Employee.objects.get(pk=pk)
        instance.delete()
        return Response(status=204)