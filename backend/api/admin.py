from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Prediction

@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ("id", "risk_level", "probability", "created_at")
    list_filter = ("risk_level", "created_at")
    search_fields = ("risk_level",)
