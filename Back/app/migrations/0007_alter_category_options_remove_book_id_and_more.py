# Generated by Django 4.2.13 on 2024-05-09 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0006_rename_avalible_book_avaliable"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="category",
            options={"ordering": ["name"]},
        ),
        migrations.RemoveField(
            model_name="book",
            name="id",
        ),
        migrations.AlterField(
            model_name="book",
            name="bookName",
            field=models.CharField(max_length=150),
        ),
        migrations.AddField(
            model_name="book",
            name="ID",
            field=models.PositiveBigIntegerField(
                default=1, primary_key=True, serialize=False
            ),
            preserve_default=False,
        ),
    ]
