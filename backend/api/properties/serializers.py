from rest_framework.serializers import CharField, ListField, Serializer


class PropertiesSerializer(Serializer):
    product_smiles = ListField(
        child=CharField(required=True, trim_whitespace=False), required=True
    )
    qed_props = ListField(
        child=CharField(required=True, trim_whitespace=False), required=False
    )
