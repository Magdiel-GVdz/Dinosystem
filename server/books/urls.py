from django.urls import path
from .views import (
    BookListCreateView, 
    BookDetailView,
     
    AuthorListCreateView, 
    AuthorDetailView, 
    
    CategoryListCreateView, 
    CategoryDetailView, 
    
    PublisherListCreateView,
    PublisherDetailView, 
    
    BookAuthorListCreateView, 
    BookAuthorDetailView,
     
    BookCategoryDetailView, 
    BookCategoryListCreateView, 
    )

urlpatterns = [
    # Books
    path('books/', BookListCreateView.as_view()),
    path('books/<int:pk>/', BookDetailView.as_view()),
    # Authors
    path('author/', AuthorListCreateView.as_view()),
    path('author/<int:pk>/', AuthorDetailView.as_view()),
    # Categories
    path('category/', CategoryListCreateView.as_view()),
    path('category/<int:pk>/', CategoryDetailView.as_view()),
    # Publishers
    path('publisher/', PublisherListCreateView.as_view()),
    path('publisher/<int:pk>/', PublisherDetailView.as_view()),
    # Book-Author and Book-Category
    path('author/book/<int:pk>/', BookAuthorListCreateView.as_view()),
    path('author/book/author/<int:pk>/', BookAuthorDetailView.as_view()),
    # Book-Category
    path('category/book/<int:pk>/', BookCategoryListCreateView.as_view()),
    path('category/book/category/<int:pk>/', BookCategoryDetailView.as_view()),
]