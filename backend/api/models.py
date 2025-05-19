from django.db import models

class Prediction(models.Model):
    input_data = models.JSONField()
    probability = models.FloatField()
    risk_level = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.risk_level} - {self.created_at}"