from django.db import models
from django.contrib.auth.models import User

class RGroupLabel(models.Model):
    label = models.TextField(primary_key=True)

class Core(models.Model):
    smiles = models.TextField(null=False)
    rgroup_labels = models.ManyToManyField(RGroupLabel)

class RGroup(models.Model):
    smiles = models.TextField(null=False)