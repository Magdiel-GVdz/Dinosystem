from django.urls import path
from .views import (
    PurchaseListCreateAPIView,
)

urlpatterns = [
    path('', PurchaseListCreateAPIView.as_view()),
    # path('<int:pk>/', BuyGeneralDetailView.as_view()),
    # path('detail/', BuyDetailListView.as_view()),
    # path('detail/<int:pk>/', BuyDetailView.as_view()),
]