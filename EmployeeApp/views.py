from common.App_logger import AppLogger
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Departments,Employees
from .serializers import DepartmentSerializer,EmployeeSerializer

from datetime import datetime

class Employee(APIView):
    def __init__(self):
        unique_id = f"{str(datetime.today().strftime('%Y-%m-%d-%H-%M-%S.%f'))}"
        self.complete_log_filename = f"logs/{unique_id}-EmployeeApp.log"
        self.logger = AppLogger(self.complete_log_filename,unique_id).set_logger()

    def get(self,request,pk):
        departments = Departments.objects.get(pk=pk)
        departments_serializer = DepartmentSerializer(departments)
        self.logger.info(f'result_data : {departments_serializer.data}')
        return Response(status = status.HTTP_200_OK,data={"status":status.HTTP_200_OK,"message":departments_serializer.data,"log_file":self.complete_log_filename})
    def post(self,request,format=None):
        departments_serializer = DepartmentSerializer(data = request.data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            self.logger.info(f'{request.data} is saved to the database')
            return Response(departments_serializer.data)
        return Response(departments_serializer.errors,status = status.HTTP_400_BAD_REQUEST)

