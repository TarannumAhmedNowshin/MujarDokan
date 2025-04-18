from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.product_list, name='product_list'),
    path('place-order/', views.place_order, name='place_order'),

]





