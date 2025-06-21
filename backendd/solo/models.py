from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mood = models.CharField(max_length=100)
    personality_traits = models.TextField()
    emotional_needs = models.TextField()
    points = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

class Quest(models.Model):
    QUEST_TYPE_CHOICES = [
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField()
    quest_type = models.CharField(max_length=10, choices=QUEST_TYPE_CHOICES, default='daily')
    context = models.TextField(blank=True)  # e.g. personalized context
    tags = models.CharField(max_length=200, blank=True)  # comma-separated tags
    created_for = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    personalized_score = models.FloatField(default=0)  # for ML-like ranking

class Reflection(models.Model):
    quest = models.ForeignKey(Quest, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    photo = CloudinaryField('image', blank=True, null=True)
    audio = CloudinaryField('file', blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

class Reward(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    cost = models.IntegerField()

# Note: Add MEDIA_URL and MEDIA_ROOT in settings.py for file uploads.
