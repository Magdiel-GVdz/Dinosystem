from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


from . models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
        # ...
        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    class Meta:
        model = User
        fields = ["email", "name", "middle_name", "last_name", "password", "password2"]

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data.get('name', ''),
            middle_name=validated_data.get('middle_name', ''),
            last_name=validated_data.get('last_name', '')
        )

        return user
        
        '''
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            bio=validated_data['bio']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
        '''

class ProfileSerializer(serializers.ModelSerializer):
    #notes = NoteSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = '__all__'
        

'''
class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "name", "middle_name", "last_name", "password"]
'''
        