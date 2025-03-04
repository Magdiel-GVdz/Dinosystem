from django.db import models
from users.models import User
from books.models import Book

class Buy(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    buy_date = models.DateTimeField(auto_now_add=True)
    total_price = models.FloatField(default=0)
    
class BuyItem(models.Model):
    buy = models.ForeignKey(Buy, on_delete=models.SET_NULL, null=True)
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=0)
    price = models.FloatField()
    
