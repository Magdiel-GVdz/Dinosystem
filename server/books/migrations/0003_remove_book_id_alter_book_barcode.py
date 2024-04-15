# Generated by Django 5.0.3 on 2024-04-15 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_publisher_book_publisher'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='id',
        ),
        migrations.AlterField(
            model_name='book',
            name='barcode',
            field=models.CharField(max_length=13, primary_key=True, serialize=False),
        ),
    ]
