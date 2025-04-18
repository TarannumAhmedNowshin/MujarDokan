from django.contrib import admin
from .models import Product, Order

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'amount', 'description', 'image')  # Display product fields in the admin
    search_fields = ['name', 'description']  # Allow search by name and description


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'total_amount')  # Fields to display in the admin list view
    list_filter = ('total_amount',)  # Filters available in the admin panel (e.g., by total amount)

# Register the models with their custom admin configurations
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
