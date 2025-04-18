# store/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Order, OrderItem
from .serializers import OrderSerializer, ProductSerializer  # Ensure ProductSerializer is imported

@api_view(['POST'])
def place_order(request):
    try:
        user = request.user
        products = request.data.get('products', [])
        user_data = request.data.get('user_data', {})

        # Create the order
        order = Order.objects.create(user=user)

        for product in products:
            # Check if the product exists and has sufficient stock
            product_instance = Product.objects.get(id=product['product_id'])
            if product_instance.stock < product['quantity']:
                return Response({"error": f"Not enough stock for {product_instance.name}"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Create order items
                order_item = OrderItem.objects.create(
                    order=order,
                    product_id=product['product_id'],
                    quantity=product['quantity']
                )
                
                # Decrease stock after placing the order
                product_instance.stock -= product['quantity']
                product_instance.save()

        total_price = order.total
        order.total_price = total_price
        order.save()

        return Response({
            'id': order.id,
            'user': order.user.id,
            'total_price': total_price,
            'created_at': order.created_at,
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def product_list(request):
    try:
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": "Error fetching products: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

