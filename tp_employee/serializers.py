from rest_framework import serializers
from tp_employee.models import *


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id','emp_name', 'emp_id', 'emp_mail', 'designation', 'doj', 'dob']

    def create(self, validated_data):
        """
        Create and return a new `Emplyee` instance, given the validated data.
        """
        return Employee.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Employee` instance, given the validated data.
        """
        instance.emp_name = validated_data.get('emp_name', instance.emp_name)
        instance.emp_id = validated_data.get('emp_id', instance.emp_id)
        instance.emp_mail = validated_data.get('emp_mail', instance.emp_mail)
        instance.designation = validated_data.get('designation', instance.designation)
        instance.doj = validated_data.get('doj', instance.doj)
        instance.dob = validated_data.get('dob', instance.dob)
        instance.save()
        return instance
    
class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upload
        fields = ['emp','doc']

    def create(self, validated_data):
        """
        Create and return a new `Emplyee` instance, given the validated data.
        """
        return Upload.objects.create(**validated_data)
      
    def update(self, instance, validated_data):
        """
        Update and return an existing `Employee` instance, given the validated data.
        """
        instance.emp = validated_data.get('emp', instance.emp)
        instance.doc = validated_data.get('doc', instance.doc)
        instance.save()
        return instance  