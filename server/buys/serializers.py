from rest_framework import serializers
from .models import Buy, BuyDetail

class BuySerializer(serializers.ModelSerializer):
    details = serializers.PrimaryKeyRelatedField(many=True, queryset=BuyDetail.objects.all())

    class Meta:
        model = Buy
        fields = '__all__'
        
class BuyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyDetail
        fields = '__all__'
        
