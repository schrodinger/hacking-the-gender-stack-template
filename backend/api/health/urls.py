from django.urls import path

from api.health import views

urlpatterns = [path("", views.HealthCheck.as_view())]
