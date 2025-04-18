from rest_framework import serializers
from .models import Product, Order

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'amount', 'description', 'image']   # Ensure fields match your models

class OrderSerializer(serializers.ModelSerializer):
    # No need for OrderItemSerializer, just directly use ProductSerializer
    product = ProductSerializer()  # Display product details in the order
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = Order
        fields = ['id', 'product', 'total_amount', 'total_price', 'created_at']  # Updated fields

