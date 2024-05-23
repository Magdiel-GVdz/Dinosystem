from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from .models import Buy, BuyItem
from users.models import User
from promos.models import Promotion
from .serializer import BuySerializer, BuyItemSerializer
from books.models import Book
from django.db.utils import IntegrityError

@api_view(['GET'])
#@permission_classes([IsAdminUser])
def search(request):
    query = request.query_params.get('query')
    if query is None:
        query = ''
    buy = Buy.objects.filter(
        user__email__icontains=query
    )
    serializer = BuySerializer(buy, many=True)
    return Response({'buys:': serializer.data})

@api_view(['GET'])
#@permission_classes([IsAdminUser])
def get_buys(request):
    buys = Buy.objects.all()
    serializer = BuySerializer(buys, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_buy(request):
    email = request.user
    data = request.data
    buyItems = data['buyItems']
    total_price = data['total_price']

    sum_of_prices = sum(float(item['price']) * item['quantity'] for item in buyItems)
    
    try:
        user = User.objects.get(email=email)
        print("user: ", user)
    except User.DoesNotExist:
        return Response({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    if total_price == sum_of_prices:
        try:
            buy = Buy.objects.create(
                user=user,
                total_price=total_price
            )
            print("buy: ", buy)
        except IntegrityError:
            return Response({'message': 'Buy already exists'}, status=status.HTTP_400_BAD_REQUEST)

        for i in buyItems:
            try:
                book = Book.objects.get(barcode=i['barcode'])
                print("book: ", book)
                item = BuyItem.objects.create(
                    book=book,
                    buy=buy,
                    quantity=i['quantity'],
                    price=i['price']
                )
                
                book.stock += item.quantity
                book.save()
            except Book.DoesNotExist:
                return Response({'message': 'Book does not exist'}, status=status.HTTP_400_BAD_REQUEST)


        serializer = BuySerializer(buy, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({'mensaje': sum_of_prices}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def solo_buys(request, pk):
    user = request.user
    try:
        buys = Buy.objects.get(pk=pk)
        if user.is_admin or buys.user == user:
            serializer = BuySerializer(buys, many=False)
            return Response(serializer.data)
        else:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    except Buy.DoesNotExist:
        return Response({'message': 'Buy not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
#@permission_classes([IsAdminUser])
def my_buys(request):
    user = request.user
    buys = Buy.objects.filter(user=user)
    serializer = BuySerializer(buys, many=True)
    return Response(serializer.data)
    
