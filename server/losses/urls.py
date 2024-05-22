from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_losses),
    #path('search/', views.search),
    path('create/', views.create_loss),
    path('my/', views.my_losses),
    #path('solo/<int:pk>/', views.solo_losses),
]