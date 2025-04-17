from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from .models import Product, Order, OrderItem  # Import OrderItem model to add items to the order
from .serializers import OrderSerializer  # Ensure you have a serializer for the Order model

@api_view(['POST'])
def place_order(request):
    if request.method == 'POST':
        user = request.user
        products = request.data.get('products', [])
        user_data = request.data.get('user_data', {})

        # Create the order
        order = Order.objects.create(user=user)

        # Create order items and add them to the order
        for product in products:
            order_item = OrderItem.objects.create(
                order=order,
                product_id=product['product_id'],
                quantity=product['quantity']
            )

        # Calculate the total price
        total_price = order.total  # This assumes your Order model has the total property
        order.total_price = total_price
        order.save()

        return Response({
            'id': order.id,
            'user': order.user.id,
            'total_price': total_price,
            'created_at': order.created_at,
        }, status=status.HTTP_201_CREATED)
    

    
def product_list(request):
    """
    This view returns a list of all products in JSON format.
    It is useful for displaying the available products on the frontend.
    """
    # Retrieve all products from the database
    products = Product.objects.all()

    # Serialize the product data into a list of dictionaries
    product_data = [
        {"id": product.id, "name": product.name, "price": product.price, "description": product.description}
        for product in products
    ]

    return Response(product_data, status=status.HTTP_200_OK)  # Return as a JSON response

