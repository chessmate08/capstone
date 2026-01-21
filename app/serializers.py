from rest_framework import serializers
from .models import *

class InventorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Inventory
        fields = ("partnum", "description")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'