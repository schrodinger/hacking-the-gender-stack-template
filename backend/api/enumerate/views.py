from drf_spectacular.utils import extend_schema, OpenApiExample

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from science.rdkit_endpoints import rgroup_enumerate

from api.enumerate.serializers import EnumerateSerializer
from api.enumerate.examples import ENUMERATE_REQUEST_EXAMPLE


class Enumerate(APIView):

    serializer_class = EnumerateSerializer

    @extend_schema(examples=[
        OpenApiExample(name="Example",value=ENUMERATE_REQUEST_EXAMPLE, request_only=True)
    ])
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = EnumerateSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        products = rgroup_enumerate(core_smi=serializer.validated_data["core_smiles"],
                                    rgroup_smis=serializer.validated_data["rgroup_smiles"])
        response = {"products": products}
        return Response(response)
