from drf_spectacular.utils import extend_schema, OpenApiExample

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from science.rdkit_endpoints import get_QED_props, ALL_QED_PROPS

from api.properties.serializers import PropertiesSerializer
from api.properties.examples import PROPERTIES_EXAMPLE


class Properties(APIView):
    serializer_class = PropertiesSerializer

    @extend_schema(
        examples=[
            OpenApiExample(name="Example", value=PROPERTIES_EXAMPLE, request_only=True)
        ]
    )
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = PropertiesSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        product_smiles = serializer.validated_data["product_smiles"]
        qed_props = (
            serializer.validated_data["qed_props"]
            if "qed_props" in serializer.validated_data
            else ALL_QED_PROPS
        )
        products = get_QED_props(product_smiles=product_smiles, qed_props=qed_props)
        response = {"products": products}
        return Response(response)
