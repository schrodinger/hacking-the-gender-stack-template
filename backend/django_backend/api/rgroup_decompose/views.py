from django.http import HttpResponse
from django.views import View

class RGroupDecompose(View):
    def get(self, request):
        return HttpResponse("RGroupDecompose view")
