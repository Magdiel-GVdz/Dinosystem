from rest_framework import serializers
from .models import Return, ReturnItem

class ReturnItemSerializer(serializers.ModelSerializer):
    book = serializers.ReadOnlyField(source='book.title')
    class Meta:
        model = ReturnItem
        fields = '__all__'

class ReturnSerializer(serializers.ModelSerializer):
    return_items = serializers.SerializerMethodField(read_only=True)
    user = serializers.ReadOnlyField(source='user.email')
    class Meta:
        model = Return
        fields = '__all__'

    def get_return_items(self, obj):
        items = obj.returnitem_set.all()
        serializer = ReturnItemSerializer(items, many=True)
        return serializer.data
