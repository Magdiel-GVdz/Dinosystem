from django.db import models

# Create your models here.
class user(models.Model):
    name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    password = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    status = models.BooleanField(default=False)
    register_date = models.DateTimeField(auto_now_add=True)
    email = models.EmailField()
    def __str__(self):
        return self.username