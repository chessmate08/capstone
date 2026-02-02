from django.db import models
from django.contrib.auth.models import User

class Inventory(models.Model):
    partnum = models.CharField(max_length=50, unique=True)
    description=models.CharField(max_length=60, null=True)
    quantity = models.BigIntegerField(default=0)
    shelf_location= models.CharField(max_length=5, default='not on shelf')
    
    def __str__(self):
        return f'{self.partnum}'