from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from .models import Donation, DonationItem
from users.models import User
from .serializers import DonationSerializer, DonationItemSerializer
from books.models import Book
from django.db.utils import IntegrityError


@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def create_donation(request):
    email = request.user
    data = request.data
    donationItems = data['donationItems']
    reason = data['reason']
    beneficiary = data['beneficiary']
    
    try:
        user = User.objects.get(email=email)
        print("user: ", user)
    except User.DoesNotExist:
        return Response({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    donation = Donation.objects.create(
        user=user,
        reason=reason,
        beneficiary=beneficiary
    )
    
    for i in donationItems:
        try:
            book = Book.objects.get(barcode=i['barcode'])
            print("book: ", book)
        except Book.DoesNotExist:
            return Response({'message': 'Book does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            new_donation_item = DonationItem.objects.create(
                donation=donation,
                book=book,
                quantity=i['quantity']
            )
        except IntegrityError:
            return Response({'message': 'Donation item already exists'}, status=status.HTTP_400_BAD_REQUEST)
        if new_donation_item.quantity > book.stock:
                return Response(
                    {'message': 'Not enough stock.'},
                 status=status.HTTP_400_BAD_REQUEST
                )
        book.stock -= new_donation_item.quantity
        book.save()
    
    return Response({'message': 'Donation created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def my_donations(request):
    user = request.user
    donations = Donation.objects.filter(user=user)
    serializer = DonationSerializer(donations, many=True)
    return Response(serializer.data)

@api_view(['GET'])
#@permission_classes([IsAdminUser])
def get_donations(request):
    donations = Donation.objects.all()
    serializer = DonationSerializer(donations, many=True)
    return Response(serializer.data)