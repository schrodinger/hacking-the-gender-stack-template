from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from django.http import HttpResponse
from rest_framework.views import APIView

from science.rdkit_endpoints import generate_image

from api.image.serializers import ImageRequestSerializer
from api.image.examples import IMAGE_REQUEST_EXAMPLE


class Image(APIView):

    serializer_class = ImageRequestSerializer

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="smiles",
                style="query",
                examples=[
                    OpenApiExample(
                        name=IMAGE_REQUEST_EXAMPLE, value=IMAGE_REQUEST_EXAMPLE
                    )
                ],
            )
        ],
        responses={(200, "image/svg+xml"): OpenApiTypes.BYTE},
    )
    def get(self, request):
        data = request.query_params
        serializer = ImageRequestSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        smiles = serializer.validated_data["smiles"]
        img = generate_image(mol_smi=smiles)
        return HttpResponse(img, content_type="image/svg+xml")
