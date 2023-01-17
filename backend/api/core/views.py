import logging

from api.core.serializers import CoreRequestSerializer, CoreModelSerializer
from api.models import Core
from api.core.examples import EXAMPLE_REQUEST
from django.http import HttpResponseBadRequest
from drf_spectacular.utils import OpenApiExample
from drf_spectacular.utils import extend_schema
from science.rdkit_endpoints import get_rgroup_labels
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

logger = logging.getLogger(__name__)


class CoreViewSet(ModelViewSet):
    serializer_class = CoreModelSerializer
    queryset = Core.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        modelSerializer = CoreModelSerializer(queryset, many=True)
        responseList = modelSerializer.data
        for core in responseList:
            core["rgroup_labels"] = core["rgroup_labels"].split(",")
        return Response(modelSerializer.data)

    def retrieve(self, request, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        response = serializer.data
        response["rgroup_labels"] = response["rgroup_labels"].split(",")
        return Response(response)

    @extend_schema(
        examples=[
            OpenApiExample(name="Example", value=EXAMPLE_REQUEST, request_only=True)
        ]
    )
    def create(self, request):
        requestSerializer = CoreRequestSerializer(data=request.data)
        requestSerializer.is_valid(raise_exception=True)

        # Grab RGroup labels from scaffold
        try:
            labels = get_rgroup_labels(requestSerializer.validated_data["smiles"])
        except Exception as e:
            logger.exception(e)
            return HttpResponseBadRequest(
                "Error while grabbing rgroup labels from core. Are you sure you passed in a smiles string that has rgroups?"
            )

        # Save the core in the db
        labelsText = ",".join(labels)
        modelSerializer = CoreModelSerializer(
            data={
                "smiles": requestSerializer.validated_data["smiles"],
                "rgroup_labels": labelsText,
            }
        )
        modelSerializer.is_valid(raise_exception=True)
        savedModel = modelSerializer.save()

        # Serialize back to json and return
        responseJson = CoreModelSerializer(savedModel).data
        responseJson["rgroup_labels"] = responseJson["rgroup_labels"].split(",")
        return Response(responseJson, status=201)
