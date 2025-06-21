from django.urls import path
from .views import UserProfileViewSet, QuestViewSet, ReflectionViewSet, RewardViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

userprofile_list = UserProfileViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
userprofile_detail = UserProfileViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

quest_list = QuestViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
quest_detail = QuestViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})
quest_recommended = QuestViewSet.as_view({
    'get': 'recommended',
})

reflection_list = ReflectionViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
reflection_detail = ReflectionViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

reward_list = RewardViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
reward_detail = RewardViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})
reward_redeem = RewardViewSet.as_view({
    'post': 'redeem',
})

urlpatterns = [
    path('profiles/', userprofile_list, name='userprofile-list'),
    path('profiles/<int:pk>/', userprofile_detail, name='userprofile-detail'),
    path('quests/', quest_list, name='quest-list'),
    path('quests/<int:pk>/', quest_detail, name='quest-detail'),
    path('quests/recommended/', quest_recommended, name='quest-recommended'),
    path('reflections/', reflection_list, name='reflection-list'),
    path('reflections/<int:pk>/', reflection_detail, name='reflection-detail'),
    path('rewards/', reward_list, name='reward-list'),
    path('rewards/<int:pk>/', reward_detail, name='reward-detail'),
    path('rewards/<int:pk>/redeem/', reward_redeem, name='reward-redeem'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
