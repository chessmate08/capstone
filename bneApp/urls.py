
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from .views import *

urlpatterns = [
    # get JWT tokens POST
    path('token/authorize', TokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),
    path('token/verify', TokenVerifyView.as_view()),
    path('token/isadmin', isAdmin),

    # change and make take isAdmin
    path('getusers', getUsers),
    path('getuser/<int:pk>', getUser),
    # PATCH, DELETE
    path('changeuser/<int:pk>', changeUser),
    # PATCH, POST
    path('makeusers', makeUsers),

    # GET
    path('getinventory', getItems),
    path('getitem/<int:pk>', getItem),
    # PATCH, DELETE
    path('changeitem/<int:pk>', changeItem),
    # PATCH, POST
    path('makeitems', makeItems),
    # DELETE
    path('destroyinventory', destroyInventory),
]