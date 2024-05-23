from django.utils import timezone
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    UserManager,
)
from django.core.exceptions import ValidationError
from django.db import models, transaction

class CustomUserManager(UserManager):
    """
    Manager personalizado para el modelo de usuario personalizado.
    """

    def _create_user(self, email, password, **extra_fields):
        """
        Crea y guarda un usuario con el correo electrónico y la contraseña dadas.

        Args:
            email (str): Dirección de correo electrónico del usuario.
            password (str): Contraseña del usuario.
            extra_fields (dict): Campos adicionales del usuario.

        Returns:
            User: Instancia del usuario creado.

        Raises:
            ValueError: Si el correo electrónico no se proporciona o hay errores de validación.
        """
        if not email:
            raise ValueError('The given email must be set')
        try:
            with transaction.atomic():
                email = self.normalize_email(email)
                user = self.model(email=email, **extra_fields)
                user.set_password(password)
                user.full_clean()  # Validate model fields
                user.save(using=self._db)
            return user
        except ValidationError as e:
            raise ValueError(str(e))

    def create_user(self, email=None, password=None, **extra_fields):
        """
        Crea un usuario normal.

        Args:
            email (str): Dirección de correo electrónico del usuario.
            password (str): Contraseña del usuario.
            extra_fields (dict): Campos adicionales del usuario.

        Returns:
            User: Instancia del usuario creado.
        """
        extra_fields.setdefault('is_admin', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """
        Crea un superusuario.

        Args:
            email (str): Dirección de correo electrónico del superusuario.
            password (str): Contraseña del superusuario.
            extra_fields (dict): Campos adicionales del superusuario.

        Returns:
            User: Instancia del superusuario creado.

        Raises:
            ValueError: Si los campos requeridos para un superusuario no están configurados correctamente.
        """
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_admin') is not True:
            raise ValueError('Superuser must have is_admin=True.')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    """
    Modelo personalizado de usuario.
    """

    is_admin = models.BooleanField(default=False)
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'last_name']

    def get_by_natural_key(self):
        """
        Devuelve una clave natural del usuario.

        Returns:
            tuple: Tupla que contiene el correo electrónico del usuario.
        """
        return (self.email,)

    def clean(self):
        """
        Valida los campos del modelo.

        Raises:
            ValidationError: Si los campos requeridos no están configurados.
        """
        if not self.email:
            raise ValidationError('Email field is required.')
        if not self.name:
            raise ValidationError('Name field is required.')
        if not self.last_name:
            raise ValidationError('Last name field is required.')

    class Meta:
        """
        Metadatos del modelo User.
        """
        ordering = ["-date_joined"]  # Ordena los usuarios por fecha de creación descendente.
