from rest_framework_simplejwt.views import TokenObtainPairView
from . models import User

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer

class RegisterView(APIView):
    """
    Vista para el registro de nuevos usuarios.
    """

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
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




# #Login User

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

# #Register User
# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = (AllowAny,)
#     serializer_class = RegisterSerializer

# #api/profile  and api/profile/update
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getProfile(request):
#     user = request.user
#     serializer = ProfileSerializer(user, many=False)
#     return Response(serializer.data)

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateProfile(request):
#     user = request.user
#     serializer = ProfileSerializer(user, data=request.data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)



""" 
@api_view(['POST'])
def register(request):
    data = request.data
    user = User.objects.create(
        email = data['email'],
        name = data['name'],
        middle_name = data['middle_name'],
        last_name = data['last_name'],
        password = make_password(data['password'])  
    )
    serializer = RegisterUserSerializer(user, many=False)
    return Response(serializer.data) """
