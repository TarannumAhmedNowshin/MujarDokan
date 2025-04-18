

from django.contrib import admin
from .models import Product, Order, OrderItem

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'description', 'image', 'stock')  # Ensure 'stock' is added
    search_fields = ['name', 'description']  # Optional: Add search functionality

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'status', 'created_at')  # Ensure 'status' is added here
    list_filter = ('status', 'created_at')  # Add filter for 'status'

# Register the models
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)


