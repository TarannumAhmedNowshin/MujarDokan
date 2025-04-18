from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)  # Name of the product
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Price of the product
    description = models.TextField(blank=True, null=True)  # Description of the product
    image = models.ImageField(upload_to='products/', blank=True, null=True)  # Image for the product

    def __str__(self):
        return self.name

class Order(models.Model):
    # Fields for user data
    name = models.CharField(max_length=100)  # User's name
    address = models.CharField(max_length=255)  # User's address
    payment_method = models.CharField(max_length=50)  # Payment method (e.g., credit card)

    # Relationship with Product
    products = models.ManyToManyField(Product)  # Allows for multiple products in one order
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)  # Total amount of the order
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the order is created

    def __str__(self):
        return f"Order by {self.name} with total amount {self.total_amount}"

