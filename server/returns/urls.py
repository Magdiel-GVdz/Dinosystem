from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_returns),
    #path('search/', views.search),
    path('create/', views.create_return),
    #path('', views.my_returns),
    #path('my/returns/', views.my_returns),
    path('<int:pk>/', views.get_return),
]