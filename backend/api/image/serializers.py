from rest_framework.serializers import Serializer
from rest_framework.serializers import CharField

class ImageRequestSerializer(Serializer):
    smiles = CharField(required=True)