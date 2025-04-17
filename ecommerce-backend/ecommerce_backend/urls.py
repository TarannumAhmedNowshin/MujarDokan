# ecommerce_backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from store.views import place_order  # Import the place_order view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('store.urls')),  # Include store app's URLs
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT token endpoint
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT token refresh endpoint
    path('api/place-order/', place_order, name='place_order'),  # Your order endpoint
]


