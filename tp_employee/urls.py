from django.urls import path
from tp_employee import views


urlpatterns = [
    path('tp_employee/', views.EmployeeList.as_view()),
    path('tp_employee/<int:pk>/', views.EmployeeDetail.as_view()),
     path('tp_employee/searchall',views.EmployeeListView.as_view()),
    path('tp_employee/searchbyName',views.EmployeeListViewName.as_view()),
     path('tp_employee/searchbyId',views.EmployeeListViewID.as_view()),
      path('tp_employee/searchbyDesg',views.EmployeeListViewDesg.as_view()),
    path('tp_employee/upload/', views.UploadList.as_view(), name='upload_file')
]
