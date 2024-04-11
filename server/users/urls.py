from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    #Authentication
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #Profile
    path('', views.UserView.as_view(), name='user-list'),
    path('<int:pk>/', views.UserView.as_view(), name='user-detail'),
]
