# Generated by Django 4.2.13 on 2024-05-08 02:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0002_alter_book_bookname_alter_category_name"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="book",
            name="avalibleNumber",
        ),
        migrations.AddField(
            model_name="book",
            name="avalible",
            field=models.BooleanField(default=True),
        ),
    ]
