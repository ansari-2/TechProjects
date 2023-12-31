# Generated by Django 4.1.7 on 2023-07-21 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('emp_name', models.CharField(max_length=100)),
                ('emp_id', models.IntegerField(default=0)),
                ('designation', models.CharField(max_length=255)),
                ('doj', models.DateField(max_length=50)),
                ('dob', models.DateField(max_length=50)),
                ('doc', models.FileField(default=None, upload_to='https://drive.google.com/drive/folders/1qQdiPEymdgmXLEZ5vQiJtHoRLeNteBCu?usp=sharing')),
            ],
        ),
    ]
