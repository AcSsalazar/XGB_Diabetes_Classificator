from django.urls import path
from .views import predict, get_predictions, get_available_models

urlpatterns = [
    path('predict/', predict, name='predict'),
    path('predictions/', get_predictions, name='get_predictions'),
    path('models/', get_available_models, name='get_available_models'),
]