from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from .models import Loss, LossItem
from users.models import User
from .serializers import LossSerializer, LossItemSerializer
from books.models import Book
from django.db.utils import IntegrityError


@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def create_loss(request):
    email = request.user
    data = request.data
    lossItems = data['lossItems']
    reason = data['reason']

    try:
        user = User.objects.get(email=email)
        print("user: ", user)
    except User.DoesNotExist:
        return Response({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    loss = Loss.objects.create(
        user=user,
        reason=reason
    )

    for i in lossItems:
        try:
            book = Book.objects.get(barcode=i['barcode'])
            print("book: ", book)
        except Book.DoesNotExist:
            return Response({'message': 'Book does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            new_loss_item = LossItem.objects.create(
                loss=loss,
                book=book,
                quantity=i['quantity']
            )
            print("new_loss_item: ", new_loss_item)
            
        except IntegrityError:
            return Response({'message': 'Loss item already exists'}, status=status.HTTP_400_BAD_REQUEST)

        if new_loss_item.quantity > book.stock:
                return Response(
                    {'message': 'Not enough stock.'},
                 status=status.HTTP_400_BAD_REQUEST
                )
        book.stock -= new_loss_item.quantity
        book.save()
    

    return Response({'message': 'Loss created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def get_losses(request):
    losses = Loss.objects.all()
    serializer = LossSerializer(losses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
#@permission_classes([IsAdminUser])
def my_losses(request):
    user = request.user
    losses = Loss.objects.filter(user=user)
    serializer = LossSerializer(losses, many=True)
    return Response(serializer.data)