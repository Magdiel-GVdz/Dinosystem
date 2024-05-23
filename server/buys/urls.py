from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_buys),
    path('search/', views.search),
    path('create/', views.create_buy),
    path('my/buys/', views.my_buys),
    path('solo/<int:pk>/', views.solo_buys),
]