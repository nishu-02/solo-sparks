from rest_framework import viewsets, permissions
from .models import UserProfile, Quest, Reflection, Reward
from .serializers import UserProfileSerializer, QuestSerializer, ReflectionSerializer, RewardSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class QuestViewSet(viewsets.ModelViewSet):
    queryset = Quest.objects.all()
    serializer_class = QuestSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def recommended(self, request):
        user = request.user
        quest_templates = [
            {
                'title': 'Watch a sunset and reflect',
                'description': 'Take a moment to enjoy the sunset and write down your feelings.',
                'quest_type': 'daily',
                'context': 'Personalized for your current mood',
                'tags': 'reflection,sunset',
                'personalized_score': 0.8
            },
            {
                'title': 'Treat yourself to dessert alone',
                'description': 'Reflect on self-worth and joy while enjoying your favorite dessert.',
                'quest_type': 'weekly',
                'context': 'Self-love and reward',
                'tags': 'self-care,joy',
                'personalized_score': 0.7
            },
            {
                'title': 'Write a letter to your future self',
                'description': 'Express your hopes and dreams for the future.',
                'quest_type': 'monthly',
                'context': 'Goal setting and vision',
                'tags': 'future,writing',
                'personalized_score': 0.9
            },
            {
                'title': 'Go for a mindful walk',
                'description': 'Take a walk and focus on your senses and surroundings.',
                'quest_type': 'daily',
                'context': 'Mindfulness and presence',
                'tags': 'mindfulness,walking',
                'personalized_score': 0.85
            },
            {
                'title': 'Create a gratitude list',
                'description': 'List five things you are grateful for today.',
                'quest_type': 'weekly',
                'context': 'Gratitude and positivity',
                'tags': 'gratitude,positivity',
                'personalized_score': 0.75
            },
        ]
        created_quests = []
        for template in quest_templates:
            quest = Quest.objects.create(
                title=template['title'],
                description=template['description'],
                quest_type=template['quest_type'],
                context=template['context'],
                tags=template['tags'],
                created_for=user,
                personalized_score=template['personalized_score']
            )
            created_quests.append(quest)
        return Response(QuestSerializer(created_quests, many=True).data)

class ReflectionViewSet(viewsets.ModelViewSet):
    queryset = Reflection.objects.all()
    serializer_class = ReflectionSerializer
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        print('Reflection create called:', self.request.data, self.request.FILES)

        quest = Quest.objects.get(id=self.request.data['quest'])
        quest.completed = True
        quest.save()
        serializer.save()

class RewardViewSet(viewsets.ModelViewSet):
    queryset = Reward.objects.all()
    serializer_class = RewardSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def redeem(self, request, pk=None):
        reward = self.get_object()
        profile = UserProfile.objects.get(user=request.user)
        if profile.points >= reward.cost:
            profile.points -= reward.cost
            profile.save()
            return Response({'status': 'reward redeemed'})
        return Response({'status': 'not enough points'}, status=400)
