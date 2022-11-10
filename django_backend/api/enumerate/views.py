from django.http import HttpResponse
from django.views import View

class Enumerate(View):
    def get(self, request):
        return HttpResponse("Enumerate view")
