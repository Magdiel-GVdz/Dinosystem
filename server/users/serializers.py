from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo User.
    """

    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'last_name', 'middle_name', 'date_joined',
                  'is_admin', 'is_active', 'is_staff', 'phone', 'address')
        read_only_fields = ('id', 'date_joined')

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer para el registro de nuevos usuarios.
    """

    # Campo adicional para confirmar la contraseña
    confirm_password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'confirm_password', 'name', 'last_name', 'middle_name', 'phone', 'address')
        extra_kwargs = {
            'password': {'write_only': True}  # Para asegurar que la contraseña no sea visible en las respuestas
        }

    def validate(self, attrs):
        """
        Método de validación personalizado para asegurarse de que la contraseña y su confirmación coincidan.
        """
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        return attrs

    def create(self, validated_data):
        """
        Método para crear un nuevo usuario.
        """
        # Eliminar el campo confirm_password ya que no es un campo del modelo User
        del validated_data['confirm_password']

        # Encriptar la contraseña antes de guardar el usuario
        validated_data['password'] = make_password(validated_data['password'])

        user = User.objects.create_user(**validated_data)
        return user

class RegisterSuperuserSerializer(serializers.ModelSerializer):
    """
    Serializer para el registro de nuevos superusuarios.
    """

    # Campo adicional para confirmar la contraseña
    confirm_password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'confirm_password', 'name', 'last_name', 'middle_name', 'phone', 'address')
        extra_kwargs = {
            'password': {'write_only': True}  # Para asegurar que la contraseña no sea visible en las respuestas
        }

    def validate(self, attrs):
        """
        Método de validación personalizado para asegurarse de que la contraseña y su confirmación coincidan.
        """
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        return attrs
    
    def create(self, validated_data):
        """
        Método para crear un nuevo superusuario.
        """
        # Eliminar el campo confirm_password ya que no es un campo del modelo User
        del validated_data['confirm_password']

        # Encriptar la contraseña antes de guardar el usuario
        validated_data['password'] = make_password(validated_data['password'])

        user = User.objects.create_superuser(**validated_data)
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_new_password = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

    def validate(self, data):
        """
        Validates the new password and confirm_new_password fields.
        """
        new_password = data.get('new_password')
        confirm_new_password = data.get('confirm_new_password')

        if new_password != confirm_new_password:
            raise serializers.ValidationError("The new passwords do not match.")

        return data

    def update(self, instance, validated_data):
        """
        Changes the user's password.
        """
        old_password = validated_data.get('old_password')
        new_password = validated_data.get('new_password')

        user = instance
        if not user.check_password(old_password):
            raise serializers.ValidationError("Incorrect old password.")

        # Cambiar la contraseña y guardar el usuario
        user.set_password(new_password)
        user.save()
        return user
    











class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializer personalizado para generar tokens de acceso JWT con reclamos personalizados.
    Extiende el serializer TokenObtainPairSerializer proporcionado por Django Rest Framework JWT.

    Attributes:
        None

    Methods:
        get_token(cls, user): Genera un token de acceso JWT para el usuario dado, con reclamos personalizados.

    """

    @classmethod
    def get_token(cls, user):
        """
        Genera un token de acceso JWT para el usuario dado, con reclamos personalizados.

        Args:
            cls (class): Referencia a la clase misma (convención de Python).
            user (User): Instancia del usuario para el cual se genera el token JWT.

        Returns:
            dict: Token JWT generado con reclamos personalizados.

        """

        # Obtener el token base utilizando el método get_token de la clase base (TokenObtainPairSerializer)
        token = super().get_token(user)

        # Agregar reclamos personalizados al token JWT
        token['email'] = user.email
        token['name'] = user.name
        token['last_name'] = user.last_name
        token['is_admin'] = user.is_admin
        # Se pueden agregar más reclamos personalizados según sea necesario

        return token
