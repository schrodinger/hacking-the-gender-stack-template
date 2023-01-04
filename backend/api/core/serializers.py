from rest_framework.serializers import Serializer
from rest_framework.serializers import ModelSerializer
from rest_framework.fields import CharField
from api.models import Core, RGroupLabel

class CoreRequestSerializer(Serializer):
    smiles = CharField(required=True)

class RGroupLabelSerializer(ModelSerializer):
    class Meta:
        model = RGroupLabel
        fields = '__all__'

class CoreModelSerializer(ModelSerializer):
    rgroup_labels = RGroupLabelSerializer(many=True)
    class Meta:
        model = Core
        fields = ('smiles', 'rgroup_labels')
