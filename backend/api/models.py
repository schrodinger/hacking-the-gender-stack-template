from django.db import models
from django.contrib.auth.models import User

class Core(models.Model):
    smiles = models.TextField(null=False, unique=True)
    rgroup_labels = models.TextField(null=False)

class RGroup(models.Model):
    smiles = models.TextField(null=False, unique=True)