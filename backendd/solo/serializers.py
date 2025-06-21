from rest_framework import serializers
from .models import UserProfile, Quest, Reflection, Reward
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = UserProfile
        fields = '__all__'

class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = '__all__'

class ReflectionSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(required=False, allow_null=True)
    audio = serializers.FileField(required=False, allow_null=True)
    class Meta:
        model = Reflection
        fields = '__all__'

class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = '__all__'
