from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from api.enumerate.serializers import EnumerateSerializer

from science.rdkit_endpoints import rgroup_enumerate


class Enumerate(APIView):
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = EnumerateSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        products = rgroup_enumerate(core=serializer.validated_data["core_mol"], rgroups=serializer.validated_data["rgroup_mols"])
        response = {"products": products}
        return Response(response)
