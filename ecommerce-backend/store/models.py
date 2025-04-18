from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)  # Name of the product
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Price of the product
    description = models.TextField(blank=True, null=True)  # Description of the product
    image = models.ImageField(upload_to='products/', blank=True, null=True)  # Image for the product

    def __str__(self):
        return self.name

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # Link to Product model
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)  # Total amount of the order

    def __str__(self):
        return f"Order for {self.product.name} with total amount {self.total_amount}"
