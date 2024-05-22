from django.db import models

# Create your models here.
class Donation(models.Model):
    date = models.DateField(auto_now_add=True)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    reason = models.TextField()
    beneficiary = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.user} - {self.amount}"
    
class DonationItem(models.Model):
    donation = models.ForeignKey(Donation, on_delete=models.CASCADE)
    book = models.ForeignKey('books.Book', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.book.title} - {self.quantity}"