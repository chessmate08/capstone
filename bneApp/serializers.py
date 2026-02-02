from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class InventorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Inventory
        fields = ("partnum", "description", 'id')
        
        # if adding here, remember to take away from those not admin in views
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        
        exclude = ('is_superuser', 'is_staff', 'password')