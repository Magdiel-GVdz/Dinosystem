from datetime import datetime
from pytz import timezone

from rest_framework import serializers
from .models import Promotion

class PromotionSerializer(serializers.ModelSerializer):

    def validate_start_date(self, value):
        end_date = self.initial_data.get('end_date')
        if end_date and datetime.fromisoformat(str(value)).astimezone(timezone('UTC')) > datetime.fromisoformat(str(end_date)).astimezone(timezone('UTC')):
            raise serializers.ValidationError(
                'Start date must be before end date'
            )
        return value






    class Meta:
        model = Promotion
        fields = '__all__'

