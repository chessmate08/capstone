
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from .views import *

urlpatterns = [
    # get JWT tokens
    path('api/token/authorize', TokenObtainPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view()),
    path('api/token/verify', TokenVerifyView.as_view()),

    # change and make take isAdmin
    path('api/getusers', getUsers),
    path('api/getuser/<int:pk>', getUser),
    path('api/changeuser/<int:pk>', changeUser),
    path('api/makeusers', makeUsers),

    path('api/getinventory', getItems),
    path('api/getuser/<int:pk>', getItem),
    path('api/changeuser/<int:pk>', changeItem),
    path('api/makeusers', makeItems),
    path('', indexView),
]