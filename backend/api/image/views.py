from django.http import HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from api.image.serializers import ImageRequestSerializer

from science.rdkit_endpoints import generate_image

class Image(APIView):
    def post(self, request):
        data = JSONParser().parse(request)
        serializer =  ImageRequestSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        smiles = serializer.validated_data["smiles"]
        img = generate_image(mol_smi=smiles)
        return HttpResponse(img, content_type="image/svg+xml")