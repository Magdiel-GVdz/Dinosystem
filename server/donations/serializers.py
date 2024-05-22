from rest_framework import serializers
from .models import Donation, DonationItem

        
class DonationItemSerializer(serializers.ModelSerializer):
    book = serializers.ReadOnlyField(source='book.title')
    class Meta:
        model = DonationItem
        fields = '__all__'
class DonationSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')
    donations_items = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Donation
        fields = '__all__'
        
    def get_donations_items(self, obj):
        items = obj.donationitem_set.all()
        serializer = DonationItemSerializer(items, many=True)
        return serializer.data
        
