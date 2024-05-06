from django.db import models
from users.models import User
from books.models import Book
from promos.models import Promotion
from django.utils import timezone

class Buy(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(auto_now_add=True)
    total_price = models.FloatField()
    
class BuyItem(models.Model):
    buy = models.ForeignKey(Buy, on_delete=models.SET_NULL, null=True)
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=0)
    price = models.FloatField()
    
 