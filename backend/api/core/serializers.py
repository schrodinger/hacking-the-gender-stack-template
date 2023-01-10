from rest_framework.serializers import Serializer
from rest_framework.serializers import ModelSerializer
from rest_framework.fields import CharField
from api.models import Core


class CoreRequestSerializer(Serializer):
    smiles = CharField(required=True)


class CoreModelSerializer(ModelSerializer):
    class Meta:
        model = Core
        fields = "__all__"
