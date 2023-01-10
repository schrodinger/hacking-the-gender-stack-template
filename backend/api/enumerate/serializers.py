from rest_framework.serializers import CharField, ListField, DictField, Serializer


class EnumerateSerializer(Serializer):
    core_smiles = CharField(required=True, trim_whitespace=False)
    rgroup_smiles = DictField(
        child=ListField(
            child=CharField(required=True, trim_whitespace=False), required=True
        ),
        required=True,
    )
