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
#@permission_classes([IsAuthenticated])
def create_buy(request):
    user = request.user
    data = request.data
    buyItems = data['buyItems']
    total_price = data['total_price']
    
    sum_of_prices = sum(int(float(item['price'])) * item['quantity'] for item in buyItems) 
    
    if total_price == sum_of_prices:
        buy = Buy.objects.create(
            user=user,
            total_price=total_price
        )
        for i in buyItems:
            book = Book.objects.get(barcode=i['barcode'])
            promotion = Promotion.objects.filter(
                book=book,
                start_date__lte=datetime.now(),
                end_date__gte=datetime.now()
            ).first()
            if promotion:
                descuento = (promotion.discount/100)*float(i['price'])
                item = BuyItem.objects.create(
                    buy=buy,
                    book=book,
                    quantity=i['quantity'],
                    price=float(i['price']),
                    subtotal=float(i['subtotal'])-descuento
                )
            else:
                item = BuyItem.objects.create(
                    buy=buy,
                    book=book,
                    quantity=i['quantity'],
                    price=i['price'],
                    subtotal=i['subtotal']
                )
            
            book.stock -= item.quantity
            book.save()
        
        serializer = BuySerializer(buy, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({'mesaje': sum_of_prices}, status=status.HTTP_400_BAD_REQUEST)

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
    
