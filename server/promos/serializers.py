from datetime import datetime
from pytz import timezone

from rest_framework import serializers
from .models import Promotion

class PromotionSerializer(serializers.ModelSerializer):
    def validate_start_date(self, value):
        if value.astimezone(timezone('UTC')) > datetime.strptime(self.initial_data.get('end_date', None)[0:19], '%Y-%m-%dT%H:%M').astimezone(timezone('UTC')):
            raise serializers.ValidationError('Start date must be before end date')
        return value

    def validate_end_date(self, value):
        if value.astimezone(timezone('UTC')) < datetime.strptime(self.initial_data.get('start_date', None)[0:19], '%Y-%m-%dT%H:%M').astimezone(timezone('UTC')):
            raise serializers.ValidationError('End date must be after start date')
        return value

    class Meta:
        model = Promotion
        fields = '__all__'

