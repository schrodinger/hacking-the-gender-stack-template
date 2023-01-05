from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import CoreViewSet

router = DefaultRouter()
router.register('', CoreViewSet, 'core')

urlpatterns = [
    path("", include(router.urls))
]
