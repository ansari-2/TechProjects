from django.db import models

class Employee(models.Model):
    emp_firstname = models.CharField(max_length = 100,null = True)
    emp_lastname = models.CharField(max_length = 100,null=True)
    emp_gender = models.CharField(max_length = 100,null = True)
    emp_id = models.IntegerField(default = 0)
    emp_mail = models.EmailField(null=True)
    designation = models.CharField(max_length = 255)
    ssn = models.CharField(max_length= 100,null=True)
    emp_username = models.CharField(max_length=100,null=True)
    emp_alternatemail = models.CharField(max_length=100,null=True)
    contact = models.CharField(max_length=20,null=True)
    emp_type = models.CharField(max_length=100,null=True)
    emp_status = models.CharField(max_length = 100,null=True)
    emp_department = models.CharField(max_length = 100,null=True)

    doj = models.DateField(max_length=50)
    dob = models.DateField(max_length=50)


    def __str__(self):
        return str(self.emp_firstname)
   

class Upload(models.Model):
    emp = models.ForeignKey(Employee, on_delete=models.CASCADE)
    doc = models.FileField(upload_to='storage/',default='none')

    def __str__(self):
        return str(self.emp.emp_firstname)
    
class Timesheet(models.Model):
    # emp_data = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2)
    project_name = models.CharField(max_length=100)
    task_description = models.TextField()

    def __str__(self):
        return f"{self.emp_data.emp_firstname}"    