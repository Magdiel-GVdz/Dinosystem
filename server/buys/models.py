from django.db import models

class Buy(models.Model):
    """A buy made by a user"""

    user = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        verbose_name='user',
        related_name='buys',
    )
    buy_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='buy date',
    )
    total = models.FloatField(
        verbose_name='total',
    )

    def __str__(self):
        return f'Buy n°{self.id}'

    class Meta:
        ordering = ['-buy_date']
        verbose_name = 'buy'
        verbose_name_plural = 'buys'

        
class BuyDetail(models.Model):
    buy = models.ForeignKey('Buy', on_delete=models.CASCADE, related_name='details')
    book = models.ForeignKey('books.Book', on_delete=models.CASCADE, related_name='in_buys')
    quantity = models.PositiveIntegerField(verbose_name='Quantity')
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Unit price')

    def __str__(self):
        return f'{self.book} x{self.quantity} in buy n°{self.buy.id}'

    class Meta:
        verbose_name = 'Buy detail'
        verbose_name_plural = 'Buy details'
        ordering = ['-id']

