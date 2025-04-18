from django.contrib import admin
from .models import Product, Order

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'amount', 'description', 'image')  # Display product fields in the admin
    search_fields = ['name', 'description']  # Allow search by name and description
    list_filter = ('name',)  # Filters available in the admin panel (e.g., by name)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'address', 'payment_method', 'get_products', 'total_amount', 'created_at')  # Show the relevant fields
    list_filter = ('total_amount', 'created_at')  # Filters available in the admin panel (e.g., by total amount and creation date)

    # Custom method to display all products in an order
    def get_products(self, obj):
        return ", ".join([product.name for product in obj.products.all()])
    get_products.short_description = 'Products'

# Register the models with their custom admin configurations
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
