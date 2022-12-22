from drf_spectacular.utils import extend_schema, OpenApiExample

from django.http import HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from science.rdkit_endpoints import generate_image

from api.image.serializers import ImageRequestSerializer
from api.image.examples import IMAGE_REQUEST_EXAMPLE


class Image(APIView):

    serializer_class = ImageRequestSerializer

    @extend_schema(examples=[
        OpenApiExample(name="Example",value=IMAGE_REQUEST_EXAMPLE, request_only=True)
    ])
    def post(self, request):
        data = JSONParser().parse(request)
        serializer =  ImageRequestSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        smiles = serializer.validated_data["smiles"]
        img = generate_image(mol_smi=smiles)
        return HttpResponse(img, content_type="image/svg+xml")