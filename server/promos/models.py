from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import datetime

class Promotion(models.Model):
    """Model for promotions that can be applied to books."""
    name = models.CharField(max_length=100, unique=True, verbose_name="Name")
    book = models.ManyToManyField(
        "books.Book",
        related_name="promotion",
        verbose_name="Book",
    )
    description = models.TextField(
        help_text="A brief description of the promotion.",
        verbose_name="Description",
    )
    discount = models.FloatField(
        validators=[
            MinValueValidator(
                0, message="Discount must be greater than or equal to 0."
            ),
            MaxValueValidator(
                100, message="Discount must be less than or equal to 100."
            ),
        ],
        help_text="The percentage of discount to be applied to the book price.",
        verbose_name="Discount (%)",
    )
    start_date = models.DateTimeField(
        help_text="The date when the promotion starts being available.",
        verbose_name="Start date",
        default=datetime.now,
    )
    end_date = models.DateTimeField(
        help_text="The date when the promotion stops being available.",
        verbose_name="End date",
        default=datetime.now,
    )

    class Meta:
        ordering = ["name"]
        verbose_name = "Promotion"
        verbose_name_plural = "Promotions"

    def __str__(self):
        return self.name




