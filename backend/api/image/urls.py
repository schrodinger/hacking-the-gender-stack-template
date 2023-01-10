from django.urls import path

from . import views

urlpatterns = [path("", views.Image.as_view())]
