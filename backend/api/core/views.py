from rest_framework.viewsets import ModelViewSet
from api.core.serializers import CoreRequestSerializer, CoreModelSerializer, RGroupLabelSerializer
from api.models import Core
from science.rdkit_endpoints import get_rgroup_labels
from django.http import HttpResponseBadRequest, HttpResponse
import logging
from rest_framework.renderers import JSONRenderer

logger = logging.getLogger(__name__)

class CoreViewSet(ModelViewSet):
    serializer_class = CoreRequestSerializer
    queryset = Core.objects.all()

    def list(self,request):
        response = []
        for core in self.queryset:
            # Serialize the rgroup labels to a list of strings
            serializer = CoreModelSerializer(core)
            rgrouplabels_list = [ i.get('label') for i in serializer.data['rgroup_labels']]
            core_to_serialize = {"smiles": serializer.data["smiles"], "rgroup_labels": rgrouplabels_list}
            response.append(core_to_serialize)
        return HttpResponse(JSONRenderer().render(response))


    def create(self, request):
        requestSerializer = CoreRequestSerializer(data=request.data)
        requestSerializer.is_valid(raise_exception=True)

        # Grab RGroup labels from scaffold
        try:
            labels = get_rgroup_labels(requestSerializer.validated_data["smiles"])
        except Exception as e:
            logger.exception(e)
            return HttpResponseBadRequest("Error while grabbing rgroup labels from core. Are you sure you passed in a smiles string that has rgroups?")

        for label in labels:
            labelSerializer = RGroupLabelSerializer(data={"label":label})
            labelSerializer.is_valid(raise_exception=True)
            labelSerializer.save()

        modelSerializer = CoreModelSerializer(data={"smiles": requestSerializer.validated_data["smiles"], "rgroup_labels": labels})
        modelSerializer.is_valid(raise_exception=True)
        modelSerializer.save()
        return HttpResponse(status=201)


        
            
