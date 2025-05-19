from django.urls import path
from .views import predict, get_predictions

urlpatterns = [
    path('predict/', predict, name='predict'),
    path('predictions/', get_predictions, name='get_predictions'),
]