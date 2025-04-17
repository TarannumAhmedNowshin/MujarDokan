# store/urls.py

from django.urls import path
from . import views  # Ensure that you are importing the views correctly

urlpatterns = [
    path('products/', views.product_list, name='product_list'), 
    path('place-order/', views.place_order, name='place_order'),
    # Add other views or API routes here as needed
]
