from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from store.models import Product, Order  # Assuming you have a Product and Order model
from store.serializers import OrderSerializer  # Assuming you have an OrderSerializer
from django.http import JsonResponse
from .models import Product 

@api_view(['POST'])
def place_order(request):
    if request.method == 'POST':
        # Assuming user data and product data are coming in the request
        products = request.data.get('products', [])
        user_data = request.data.get('user_data', {})

        # Process the order (store in the database)
        order = Order.objects.create(user=request.user)  # Assuming you have a user field
        total_price = 0

        for product in products:
            try:
                product_instance = Product.objects.get(id=product['product_id'])
                total_price += product_instance.price * product['quantity']
                order.products.add(product_instance, through_defaults={'quantity': product['quantity']})  # Assuming many-to-many relation
            except Product.DoesNotExist:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        order.total_price = total_price
        order.save()

        # Serialize and return the response
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


def product_list(request):
    # Retrieve all products from the database
    products = Product.objects.all()

    # Serialize the product data into JSON format
    product_data = [
        {"id": product.id, "name": product.name, "price": product.price}
        for product in products
    ]

    return JsonResponse(product_data, safe=False)

