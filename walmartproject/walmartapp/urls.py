from django.urls import path
from .views import getRecommendations
from .views import getRecommendationsImage
from .views import getSeason
from .views import get_range_prices

urlpatterns = [
    path('getRecommendations/', getRecommendations),
    path('getRecommendationsImage/', getRecommendationsImage),
    path('getSeason/', getSeason),
    path('get_range_prices/',get_range_prices)

]