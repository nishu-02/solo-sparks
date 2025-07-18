# Generated by Django 5.2.3 on 2025-06-21 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solo', '0002_reward_userprofile_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='quest',
            name='context',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='quest',
            name='personalized_score',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='quest',
            name='quest_type',
            field=models.CharField(choices=[('daily', 'Daily'), ('weekly', 'Weekly'), ('monthly', 'Monthly')], default='daily', max_length=10),
        ),
        migrations.AddField(
            model_name='quest',
            name='tags',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='reflection',
            name='audio',
            field=models.FileField(blank=True, null=True, upload_to='reflections/audio/'),
        ),
        migrations.AlterField(
            model_name='reflection',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='reflections/photos/'),
        ),
    ]
