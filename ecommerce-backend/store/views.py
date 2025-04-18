from decimal import Decimal
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Order
from .serializers import OrderSerializer, ProductSerializer

@api_view(['POST'])
def place_order(request):
    try:
        # Extract product information and total_amount from the request
        products_data = request.data.get('products', [])
        total_amount = request.data.get('total_amount', 0)

        # Ensure the total amount is treated as a Decimal for calculations
        total_amount = Decimal(total_amount)  # Convert to Decimal to avoid issues

        # Create the order instance
        order = Order.objects.create(total_amount=total_amount)

        # Add products to the order
        product_ids = [product['product_id'] for product in products_data]
        products = Product.objects.filter(id__in=product_ids)
        order.products.set(products)  # Add products to the order using Many-to-Many field
        order.save()

        # Return the serialized order data
        return Response({"id": order.id, "total_amount": str(order.total_amount)}, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
def product_list(request):
    try:
        products = Product.objects.all()  # Fetch all products from the database
        serializer = ProductSerializer(products, many=True)  # Serialize the products
        return Response(serializer.data, status=status.HTTP_200_OK)  # Return the data as JSON
    except Exception as e:
        return Response({"error": "Error fetching products: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
