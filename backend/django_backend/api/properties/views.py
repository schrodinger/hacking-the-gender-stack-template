from django.http import HttpResponse
from django.views import View

class Properties(View):
    def get(self, request):
        return HttpResponse("Properties view")
