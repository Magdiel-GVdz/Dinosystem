# Generated by Django 5.0.3 on 2024-05-06 03:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('books', '0004_remove_author_last_name_remove_author_middle_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Buy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BuyItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=0)),
                ('price', models.FloatField()),
                ('book', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='books.book')),
                ('buy', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='buys.buy')),
            ],
        ),
    ]
