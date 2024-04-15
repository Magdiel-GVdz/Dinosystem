
from rest_framework import generics
from .models import Promotion
from .serializers import PromotionSerializer

class PromoListView(generics.ListCreateAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer

    def perform_create(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save()

class PromoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer

    def perform_update(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()

