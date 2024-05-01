from django.db import models

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

class Buy(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    total = models.FloatField()
    detailBuy = models.ManyToManyField('books.Book', through='DetailBuy')
    
class DetailBuy(models.Model):
    buy = models.ForeignKey(Buy, on_delete=models.CASCADE)
    book = models.ForeignKey('books.Book', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.FloatField()
    subtotal = models.FloatField()
    returned = models.BooleanField(default=False)
    