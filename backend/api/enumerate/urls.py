from django.urls import path

from api.enumerate import views

urlpatterns = [path("", views.Enumerate.as_view())]
