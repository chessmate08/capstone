from django.contrib import admin
from .models import *
# Register your models here
class InventoryAdmin(admin.ModelAdmin):
    list_display = ['partnum', 'quantity', 'shelf_location']

admin.site.register(Inventory)

