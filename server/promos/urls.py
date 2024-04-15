from django.urls import path
from .views import (
    PromoDetailView,
    PromoListView,
)

urlpatterns = [
    path('', PromoListView.as_view()),
    path('<int:pk>/', PromoDetailView.as_view()),
]