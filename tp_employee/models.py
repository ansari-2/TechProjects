from django.db import models

class Employee(models.Model):
    emp_name = models.CharField(max_length = 100)
    emp_id = models.IntegerField(default = 0)
    designation = models.CharField(max_length = 255)
    doj = models.DateField(max_length=50)
    dob = models.DateField(max_length=50)
   
class Upload(models.Model):
    emp = models.ForeignKey(Employee,on_delete=models.CASCADE)
    doc = models.FileField(upload_to='storage/')   
