from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_donations),
    #path('search/', views.search),
    path('create/', views.create_donation),
    path('my/', views.my_donations),
    #path('<int:pk>/', views.solo_donations),
]
