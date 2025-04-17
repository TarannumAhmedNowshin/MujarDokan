from django.urls import path
from store.views import ProductList
urlpatterns = [ path("api/products/", ProductList.as_view(), name="product-list"), ]