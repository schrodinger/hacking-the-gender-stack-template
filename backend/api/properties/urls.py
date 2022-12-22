from django.urls import path

from api.properties import views

urlpatterns = [path("", views.Properties.as_view())]
