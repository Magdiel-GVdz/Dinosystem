from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from .models import Sale, SaleItem
from users.models import User
from promos.models import Promotion
from .serializers import SaleSerializer, SaleItemSerializer
from books.models import Book
from django.db.utils import IntegrityError


@api_view(['GET'])
#@permission_classes([IsAdminUser])
def search(request):
    query = request.query_params.get('query')
    if query is None:
        query = ''
    sales = Sale.objects.filter(
        user__email__icontains=query
    )
    serializer = SaleSerializer(sales, many=True)
    return Response({'sales:': serializer.data})

@api_view(['GET'])
#@permission_classes([IsAdminUser])
def get_sales(request):
    sales = Sale.objects.all()
    serializer = SaleSerializer(sales, many=True)
    return Response(serializer.data)

@api_view(['POST'])
#@permission_classes([IsAdminUser])
def create_sale(request):
    try:
        user = request.user
        data = request.data

        if 'saleItems' not in data:
            return Response(
                {'message': 'Malformed request.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        saleItems = data['saleItems']
        total_price = 0

        if not saleItems:
            return Response(
                {'message': 'Malformed request.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # sum_of_prices = sum(float(item['price']) * item['quantity'] for item in saleItems)

        # if total_price != sum_of_prices:
        #     return Response(
        #         {'message': 'Total price does not match the sum of prices.'},
        #         status=status.HTTP_400_BAD_REQUEST
        #     )

        sale = Sale.objects.create(
            user=user,
            total_price=0
        )

        for item in saleItems:
            try:
                book = Book.objects.get(barcode=item['barcode'])
            except Book.DoesNotExist:
                return Response(
                    {'message': 'Book does not exist.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                
                promotions = Promotion.objects.filter(
                    book=book,
                    start_date__lte=datetime.now(),
                    end_date__gte=datetime.now()
                )
                total_price=0
                if promotions.exists():
                    promotion = promotions.first()
                    descuento = (promotion.discount/100)*book.price
                    new_item = SaleItem.objects.create(
                        sale=sale,
                        book=book,
                        quantity=item['quantity'],
                        price=book.price,
                        subtotal=descuento * item['quantity'],
                        promo=promotion
                    )
                    total_price += (descuento * item['quantity'])
                else:
                    new_item = SaleItem.objects.create(
                        sale=sale,
                        book=book,
                        quantity=item['quantity'],
                        price=book.price,
                        subtotal=book.price * item['quantity']
                    )
                    total_price += book.price * item['quantity']
                
                
            except IntegrityError:
                return Response(
                    {'message': 'Book is not available for sale.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if new_item.quantity > book.stock:
                return Response(
                    {'message': 'Not enough stock.'},
                 status=status.HTTP_400_BAD_REQUEST
                )

            sale.total_price += total_price
            sale.save()
            book.stock -= new_item.quantity
            book.save()

        serializer = SaleSerializer(sale, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response(
            {'message': f'{type(e).__name__}: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        
@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def solo_sales(request, pk):
    user = request.user
    try:
        sale = Sale.objects.get(pk=pk)
        if user.is_admin or sale.user == user:
            serializer = SaleSerializer(sale, many=False)
            return Response(serializer.data)
        else:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    except Sale.DoesNotExist:
        return Response({'message': 'Sale not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
#@permission_classes([IsAdminUser])
def my_sales(request):
    user = request.user
    sales = Sale.objects.filter(user=user)
    serializer = SaleSerializer(sales, many=True)
    return Response(serializer.data)
    

    

