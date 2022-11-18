from django.http import HttpResponse
from django.views import View

class Image(View):
    def get(self, request):
        return HttpResponse("Image view")
