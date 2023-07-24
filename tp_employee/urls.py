from django.urls import path
from tp_employee import views


urlpatterns = [
    path('tp_employee/', views.EmployeeList.as_view()),
    path('tp_employee/<int:pk>/', views.EmployeeDetail.as_view()),
    path('tp_employee/search',views.EmployeeListView.as_view()),
    path('tp_employee/upload/', views.UploadList.as_view(), name='upload_file')
]
