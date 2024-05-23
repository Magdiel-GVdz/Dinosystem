from rest_framework import serializers
from .models import Buy, BuyItem

class BuyItemSerializer(serializers.ModelSerializer):
    book = serializers.ReadOnlyField(source='book.title')
    class Meta:
        model = BuyItem
        fields = '__all__'
        
class BuySerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')
    buys_items = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Buy
        fields = '__all__'
        
    def get_buys_items(self, obj):
        items = obj.buyitem_set.all()
        serializer = BuyItemSerializer(items, many=True)
        return serializer.data
    
    