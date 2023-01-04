from rest_framework.viewsets import ModelViewSet
from api.rgroup.serializers import RGroupSerializer
from api.models import RGroup

class RGroupViewSet(ModelViewSet):
    serializer_class = RGroupSerializer
    queryset = RGroup.objects.all()