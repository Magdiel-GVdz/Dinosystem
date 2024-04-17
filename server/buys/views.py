from rest_framework import generics
from .models import Buy, BuyDetail
from .serializers import BuySerializer, BuyDetailSerializer
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError


class PurchaseListCreateAPIView(generics.ListCreateAPIView):
    queryset = Buy.objects.all()
    serializer_class = BuySerializer

    def post(self, request, *args, **kwargs):
        purchase_data = request.data
        purchase_details_data = purchase_data.pop('purchase_details', [])

        purchase_serializer = self.get_serializer(data=purchase_data)
        purchase_serializer.is_valid(raise_exception=True)
        purchase = purchase_serializer.save()

        purchase_details_serializer = BuyDetailSerializer(data=purchase_details_data, many=True)
        purchase_details_serializer.is_valid(raise_exception=True)
        purchase_details_serializer.save(purchase=purchase)

        headers = self.get_success_headers(purchase_serializer.data)
        return Response(purchase_serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    