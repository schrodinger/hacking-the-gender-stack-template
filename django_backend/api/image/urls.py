from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    path("", csrf_exempt(views.Image.as_view()), name="image")
]
