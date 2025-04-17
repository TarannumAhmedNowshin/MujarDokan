# store/views.py

from django.http import JsonResponse
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the E-commerce API!")


def product_list(request):
    # Example data to test the view
    products = [
        {"id": 1, "name": "Product 1", "price": 100},
        {"id": 2, "name": "Product 2", "price": 200},
    ]
    return JsonResponse(products, safe=False)
