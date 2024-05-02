from django.db import models
from users.models import User
from books.models import Book


class Buy(models.Model):
    user = models.ForeignKey('User', on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(auto_now_add=True)
    total_price = models.CharField(max_length=250, blank=True)
    
class BuyItem(models.Model):
    buy = models.ForeignKey(Buy, on_delete=models.SET_NULL, null=True)
    book = models.ForeignKey('Book', on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=0)
    price = models.CharField(max_length=250, blank=True)
    subtotal = models.FloatField()
    returned = models.BooleanField(default=False)
    
# Create your models here.
# ejemplo de peticion para la api
# {
#     'user',
#     'detalleVenta' : [
#         {
#             'libro',
#             'promocion',
#             'cantidad',
#             'precio',
#             'subtotal'
#             'devuelto'
#         },
#         {
#             'libro',
#             'promocion',
#             'cantidad',
#             'precio',
#             'subtotal'
#             'devuelto'
#         }
#     ]
#     'fecha',
#     'total'   
# }