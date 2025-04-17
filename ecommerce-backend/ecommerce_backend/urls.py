# ecommerce_backend/urls.py

from django.contrib import admin
from django.urls import path, include
from store.views import home

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('store.urls')),  # This should point to the correct app's urls
]
