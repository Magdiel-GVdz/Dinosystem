from rest_framework import serializers
from .models import Loss, LossItem

class LossItemSerializer(serializers.ModelSerializer):
    book = serializers.ReadOnlyField(source='book.title')
    class Meta:
        model = LossItem
        fields = '__all__'
        
class LossSerializer(serializers.ModelSerializer):
    loss_items = serializers.SerializerMethodField(read_only=True)
    user = serializers.ReadOnlyField(source='user.email')
    class Meta:
        model = Loss
        fields = '__all__'
    
    def get_loss_items(self, obj):
        items = obj.lossitem_set.all()
        serializer = LossItemSerializer(items, many=True)
        return serializer.data