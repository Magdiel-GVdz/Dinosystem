from rest_framework import serializers
from .models import Sale, SaleItem

class SaleItemSerializer(serializers.ModelSerializer):
    book = serializers.ReadOnlyField(source='book.title')
    promo = serializers.ReadOnlyField(source='promo.code')
    class Meta:
        model = SaleItem
        fields = '__all__'
        
class SaleSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')
    sales_items = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Sale
        fields = '__all__'
        
    def get_sales_items(self, obj):
        items = obj.saleitem_set.all()
        serializer = SaleItemSerializer(items, many=True)
        return serializer.data
    
    
