from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from . models import Return, ReturnItem
from . serializers import ReturnSerializer, ReturnItemSerializer
from books.models import Book
from users.models import User
from django.db.utils import IntegrityError
# Create your views here.


@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def create_return(request):
    email = request.user
    data = request.data
    returnItems = data['returnItems']
    reason = data['reason']
    sale = data['sale']
    
    try:
        user = User.objects.get(email=email)
        print("user: ", user)
    except User.DoesNotExist:
        return Response({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        sale = Sale.objects.get(pk=sale)
        print("sale: ", sale)
    except Sale.DoesNotExist:
        return Response({'message': 'Sale does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        return_Sale = Return.objects.create(
            user=user,
            reason=reason,
            sale=sale
        )
        print("return: ", return_Sale)
    except IntegrityError:
        return Response({'message': 'Return cannot be created'}, status=status.HTTP_400_BAD_REQUEST)

    for i in returnItems:
        try:
            book = Book.objects.get(barcode=i['barcode'])
            print("book: ", book)
        except Book.DoesNotExist:
            return Response({'message': 'Book does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            sale_item = SaleItem.objects.get(book=book, sale=sale)

            if sale_item.quantity < i['quantity']:
                return Response({'message': 'Not enough quantity'}, status=status.HTTP_400_BAD_REQUEST)

            new_return_item = ReturnItem.objects.create(
                return_Sale=return_Sale,
                book=book,
                quantity=i['quantity']
            )
            print("new_return_item: ", new_return_item)
            
            sale_item.quantity -= i['quantity']
            sale_item.save()

            book.stock += i['quantity']
            book.save()
        except IntegrityError:
            return Response({'message': 'Return item cannot be created'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'Return created'}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def get_returns(request):
    returns = Return.objects.all()
    serializer = ReturnSerializer(returns, many=True)
    return Response(serializer.data)


@api_view(['GET'])
#@permission_classes([IsAdminUser])
def get_return(request, pk):
    return_Sale = Return.objects.get(pk=pk)
    serializer = ReturnSerializer(return_Sale, many=False)
    return Response(serializer.data)

