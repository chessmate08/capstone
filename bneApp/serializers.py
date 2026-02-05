from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'
        
        # if adding here, remember to take away from those not admin in views
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        
        exclude = ('is_superuser', 'is_staff', 'password')