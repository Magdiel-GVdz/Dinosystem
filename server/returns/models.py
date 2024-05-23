from django.db import models
from sales.models import Sale
from books.models import Book
from users.models import User

# Create your models here.
class Return(models.Model):
    date = models.DateField(auto_now_add=True)
    reason = models.TextField()
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    sale = models.ForeignKey(Sale, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.user} - {self.reason}"

class ReturnItem(models.Model):
    return_Sale = models.ForeignKey(Return, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.book.title} - {self.quantity}"