from django.db import models

# Create your models here.
class Loss(models.Model):
    date = models.DateField(auto_now_add=True)
    reason = models.TextField()
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user} - {self.reason}"
    
class LossItem(models.Model):
    loss = models.ForeignKey(Loss, on_delete=models.CASCADE)
    book = models.ForeignKey('books.Book', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.book.title} - {self.quantity}"