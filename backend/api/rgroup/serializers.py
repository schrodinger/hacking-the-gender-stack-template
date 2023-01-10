from rest_framework.serializers import ModelSerializer
from api.models import RGroup


class RGroupSerializer(ModelSerializer):
    class Meta:
        model = RGroup
        fields = "__all__"
