from django.shortcuts import render
from . import serializers, models
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_404_NOT_FOUND,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    
    )

# Create your views here.
# GET requests for users
@api_view(['GET'])
@permission_classes([AllowAny])
def getUsers(request):
    queryset = models.User.objects.all()
    serializer = serializers.UserSerializer(queryset, many = True)
    return Response(data = serializer.data, status = HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def getUser(request, pk):
    try:
        queryset = models.User.objects.get(id = pk)
        serializer = serializers.UserSerializer(queryset, many = False).data
        return Response(data=serializer, status = HTTP_200_OK)
    except models.User.DoesNotExist:
        return Response(data = {"data": "not found"}, status = HTTP_404_NOT_FOUND)


@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
@permission_classes([IsAdminUser])
def changeUser(request, pk):
    try:
        
        queryset = models.User.objects.get(id = pk)
        
        if request.method == 'PATCH':
            serializer = serializers.UserSerializer(queryset, data = request.data , partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, HTTP_200_OK)
        
        elif request.method == 'DELETE':
            try:
                models.User.objects.get(id = pk).delete()
                
            except models.User.DoesNotExist():
                Response({"ID does not exist": "User not found"})

            

        data = serializers.UserSerializer(queryset, many = False).data
        return Response(data=data, status = HTTP_200_OK)
    except models.User.DoesNotExist():
        return Response({"data": "not found"}, HTTP_404_NOT_FOUND)
    

    

# list of users
@api_view(['PUT', 'PATCH', 'POST'])
@permission_classes([AllowAny])
@permission_classes([IsAuthenticated])
@permission_classes([IsAdminUser])
def makeUsers(request):
    # PUT request currently not implemented
    if request.method == "PUT":
        Response({"No": "THIS DELETES ENTIRE TABLE"}, HTTP_400_BAD_REQUEST)
    elif request.method == 'PATCH':
        # [{id: 1, keys: values}, {id: 2, keys: values}
        if not isinstance(request.data, list):
            return Response({"error": "Expected a list of items"}, status=HTTP_400_BAD_REQUEST)

        mutable_data = request.data 

        updated_data = []
        for item in mutable_data:
            try:
                # Safely get the id. If it's missing, you might want to handle it.
                user_id = item.get("id")
                if not user_id:
                    # Handle error if ID is missing in an item
                    continue 
                    
                queryset = models.User.objects.get(id=user_id)
            except models.User.DoesNotExist:
                # Handle case where user with specific ID is not found
                continue # Or return an error response for the entire request

            # Pass the individual item data for the specific user instance
            serializer = serializers.UserSerializer(queryset, data=item, partial=True)
            
            if serializer.is_valid():
                serializer.save()
                updated_data.append(serializer.data)
            else:
                # Return a 400 error immediately if any single item is invalid
                return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

            return Response(updated_data, status=HTTP_200_OK)
    elif request.method == 'POST':
        serializer = serializers.UserSerializer(data = request.data, many = True)
        if serializer.is_valid():
            serializer.save()
            Response(serializer.data, HTTP_201_CREATED)
        else:
            return Response(serializer.errors, HTTP_400_BAD_REQUEST)

# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------

@api_view(['GET'])
@permission_classes([AllowAny])
def getItems(request):
    queryset = models.Inventory.objects.all().order_by("partnum")
    serializer = serializers.UserSerializer(queryset, many = True)
    return Response(data = serializer.data, status = HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def getItem(request, pk):
    try:
        queryset = models.Inventory.objects.get(id = pk)
        serializer = serializers.InventorySerializer(queryset, many = False).data
        return Response(data=serializer, status = HTTP_200_OK)
    except models.Inventory.DoesNotExist:
        return Response(data = {"data": "not found"}, status = HTTP_404_NOT_FOUND)


@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def changeItem(request, pk):
    try:
        
        queryset = models.Inventory.objects.get(id = pk)
        
        if request.method == 'PATCH':
            serializer = serializers.InventorySerializer(queryset, data = request.data , partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, HTTP_200_OK)
        
        elif request.method == 'DELETE':
            try:
                models.Inventory.objects.get(id = pk).delete()
                
            except models.Inventory.DoesNotExist():
                Response({"ID does not exist": "Item not found"})

            

        data = serializers.InventorySerializer(queryset, many = False).data
        return Response(data=data, status = HTTP_200_OK)
    except models.Inventory.DoesNotExist():
        return Response({"data": "not found"}, HTTP_404_NOT_FOUND)
    

    

# list of Inventory
@api_view(['PATCH', 'POST'])
@permission_classes([IsAuthenticated])
def makeItems(request):
    
    if request.method == 'PATCH':
        # [{id: 1, keys: values}, {id: 2, keys: values}
        if not isinstance(request.data, list):
            return Response({"error": "Expected a list of items"}, status=HTTP_400_BAD_REQUEST)

        data = request.data 

        updated_data = []
        bad_data = []
        for item in data:
            try:
                itemId = item.get("id")
                if not itemId:
                    continue 
                    
                queryset = models.Inventory.objects.get(id=itemId)
            except models.Inventory.DoesNotExist:
                continue 

            serializer = serializers.InventorySerializer(queryset, data=item, partial=True)
            
            if serializer.is_valid():
                serializer.save()
                updated_data.append(serializer.data)
            else:
                return Response(serializer.errors, status=HTTP_400_BAD_REQUEST, exception=True)
            if len(bad_data) != 0:
                return Response({"bad data": bad_data}.update({"good data": updated_data}))
            return Response({"good data": updated_data}, status=HTTP_200_OK)
    elif request.method == 'POST':
        serializer = serializers.InventorySerializer(data = request.data, many = True)
        if serializer.is_valid():
            serializer.save()
            Response(serializer.data, HTTP_201_CREATED)
        else:
            return Response(serializer.errors, HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@permission_classes([IsAdminUser])
def destroyInventory(request):
    if not isinstance(request.data, list):
            return Response({"error": "Expected a list of items"}, status=HTTP_400_BAD_REQUEST)

    data = request.data 

    updated_data = []
    bad_data = []
    for item in data:
        try:
            itemId = item.get("id")
            if not itemId:
                continue 
                
            queryset = models.Inventory.objects.get(id=itemId)
        except models.Inventory.DoesNotExist:
            continue 

        serializer = serializers.InventorySerializer(queryset, data=item, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            updated_data.append(serializer.data)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST, exception=True)
        if len(bad_data) != 0:
            return Response({"bad data": bad_data}.update({"good data": updated_data}))
        return Response({"good data": updated_data}, status=HTTP_200_OK)

@api_view(['Post'])
@permission_classes([IsAuthenticated])
def isAdmin(request):
    if request.user.is_staff:
        return Response({"admin": True}, HTTP_200_OK)
    else:
        return Response({"admin": "False"}, HTTP_400_BAD_REQUEST) 
def indexView(request):
    return render('/api/whatever')

