from rest_framework import serializers
from .models import Order, Product

# ProductSerializer for serializing product data
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'amount', 'description', 'image']  # Include necessary fields for the product

# OrderSerializer for serializing order data
class OrderSerializer(serializers.ModelSerializer):
    # Display product details in the order
    products = ProductSerializer(many=True)  # Use many=True to allow multiple products in the order
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)  # Read-only field for total price

    class Meta:
        model = Order
        fields = ['id', 'name', 'address', 'payment_method', 'products', 'total_amount', 'total_price', 'created_at']

    # Override to calculate the total_price dynamically based on the products
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        total_price = sum([product['amount'] for product in representation['products']])
        representation['total_price'] = total_price
        return representation
