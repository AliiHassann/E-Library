# Generated by Django 4.2.13 on 2024-05-08 00:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="book",
            name="bookName",
            field=models.CharField(max_length=150, unique=True),
        ),
        migrations.AlterField(
            model_name="category",
            name="name",
            field=models.CharField(max_length=70, unique=True),
        ),
    ]
