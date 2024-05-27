from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_sales),
    path('search/', views.search),
    path('create/', views.create_sale),
    path('my/', views.my_sales),
    path('<int:pk>/', views.solo_sales),
    
]
