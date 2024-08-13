from django.urls import path
from .views import getRecommendations

urlpatterns = [
    path('getRecommendations/', getRecommendations),
]