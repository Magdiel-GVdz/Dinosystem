from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Publisher(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Book(models.Model):
    barcode = models.CharField(max_length=13, primary_key=True)
    title = models.CharField(max_length=100)
    price = models.FloatField()
    isbn = models.CharField(max_length=13)
    stock = models.IntegerField(default=0)
    
    authors = models.ManyToManyField(Author, through='BookAuthor', related_name='books')
    categories = models.ManyToManyField(Category, through='BookCategory', related_name='books')

    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, related_name='books')
    
    def __str__(self):
        return self.title

class BookAuthor(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='book_authors')
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='book_authors')

    def __str__(self):
        return f"{self.book.title} - {self.author.name} {self.author.last_name}"

class BookCategory(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='book_categories')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='book_categories')

    def __str__(self):
        return f"{self.book.title} - {self.category.name}"

    

