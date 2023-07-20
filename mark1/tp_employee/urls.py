from django.urls import path
from .views import EmployeeViewSet
from rest_framework.routers import DefaultRouter



# app_name = 'tp_employee'  

# employee_list = EmployeeViewSet.as_view({'get': 'list','post': 'create'})
# employee_detail = EmployeeViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})

# urlpatterns = [
#     path('employees/', employee_list, name='employee-list'),
#     path('employees/<int:pk>/', employee_detail, name='employee-detail'),
# ]


# Create a router and register the EmployeeViewSet with it

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')

urlpatterns = router.urls
