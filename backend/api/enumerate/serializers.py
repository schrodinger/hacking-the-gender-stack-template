from rest_framework.serializers import CharField
from rest_framework.serializers import ListField
from rest_framework.serializers import Serializer


class EnumerateSerializer(Serializer):
    core_mol = CharField(required=True, trim_whitespace=False)
    rgroup_mols = ListField(child=CharField(required=True, trim_whitespace=False), required=True)
