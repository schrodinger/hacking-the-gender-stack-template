from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import RGroupViewSet

router = DefaultRouter()
router.register("", RGroupViewSet, "rgroup")

urlpatterns = [path("", include(router.urls))]
