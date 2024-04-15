from rest_framework_simplejwt.views import TokenObtainPairView
from . models import User
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer, UserSerializer, RegisterSuperuserSerializer, ChangePasswordSerializer
import pickle as pk
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import (
    IsAuthenticated,
)

import logging

logger = logging.getLogger(__name__)

class UserView(APIView):
    """
    Vista para el CRUD de usuarios.

    Clase que permite el manejo de usuarios, y ofrece métodos para obtener,
    crear, editar y eliminar usuarios.
    """

    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # Serializar los datos del cuerpo de la solicitud
        serializer = RegisterSerializer(data=request.data)

        # Validar los datos recibidos
        if serializer.is_valid():
            # Verificar si ya existe un usuario con el mismo nombre de usuario o correo electrónico

            email = serializer.validated_data['email']
            if User.objects.filter(email=email).exists():
                return Response({"error": "Ya existe un usuario con este correo electrónico."}, status=status.HTTP_400_BAD_REQUEST)

            # Guardar el nuevo usuario en la base de datos
            serializer.save()

            # Devolver una respuesta exitosa con un mensaje descriptivo
            return Response({"message": "Usuario registrado exitosamente."}, status=status.HTTP_201_CREATED)
        # Si los datos no son válidos, devolver un error con los detalles de la validación
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        if pk is not None:
            user = self._get_user(pk)
            if user is None:
                return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)

    def put(self, request, pk):
        user = self._get_user(pk)
        if user is None:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            if self._user_exists(serializer.validated_data['email']):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        user = self._get_user(pk)
        if user is None:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            if self._user_exists(serializer.validated_data['email']):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        user = self._get_user(pk)
        if user is None:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        user.delete()
        return Response({"message": "Usuario eliminado exitosamente."}, status=status.HTTP_204_NO_CONTENT)

    def _user_exists(self, email):
        return User.objects.filter(email=email).exists()

    def _get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            return None

    
    
class SuperUserView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        # Serializar los datos del cuerpo de la solicitud
        serializer = RegisterSuperuserSerializer(data=request.data)
        
        # Validar los datos recibidos
        if serializer.is_valid():
            # Verificar si ya existe un usuario con el mismo nombre de usuario o correo electrónico
            
            email = serializer.validated_data['email']
            if User.objects.filter(email=email).exists():
                return Response({"error": "Ya existe un usuario con este correo electrónico."}, status=status.HTTP_400_BAD_REQUEST)

            # Guardar el nuevo usuario en la base de datos
            serializer.save()

            # Devolver una respuesta exitosa con un mensaje descriptivo
            return Response({"message": "Usuario registrado exitosamente."}, status=status.HTTP_201_CREATED)
        # Si los datos no son válidos, devolver un error con los detalles de la validación
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=serializer.validated_data['email'])
            if user is None:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            serializer.update(user, serializer.validated_data)
            return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)

        except Exception as e:
            # Log the full stack trace in case something unexpected happens
            logger.exception(e)
            return Response({"error": "Something went wrong when trying to change the password"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
    


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


