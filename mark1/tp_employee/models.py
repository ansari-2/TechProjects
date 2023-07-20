from django.db import models


class Employee(models.Model):
    employee_id = models.CharField(max_length=20,unique=True)
    employee_name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    date_of_join = models.DateField()
    date_of_birth = models.DateField()

    def __str__(self):
        return self.employee_name




