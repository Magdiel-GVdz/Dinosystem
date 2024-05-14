from django.db import models
from users.models import User
from books.models import Book
from promos.models import Promotion

class Sale(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    sale_date = models.DateTimeField(auto_now_add=True)
    total_price = models.FloatField()
    
class SaleItem(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.SET_NULL, null=True)
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=0)
    price = models.FloatField()
    subtotal = models.FloatField()
    promo = models.ForeignKey(Promotion, on_delete=models.SET_NULL, null=True)
    
    
