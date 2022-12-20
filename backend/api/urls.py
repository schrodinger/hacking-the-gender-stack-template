from django.contrib import admin
from django.urls import path, include


def prefix(str):
    return "api/" + str

urlpatterns = [
    path(prefix('admin/'), admin.site.urls),
    path(prefix('health/'), include('api.health.urls')),
    path(prefix('enumerate/'), include('api.enumerate.urls')),
]
