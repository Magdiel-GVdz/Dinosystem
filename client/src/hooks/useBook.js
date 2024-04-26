import axios from "axios";

export const useBook = () => {
  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/book");
      if (!response) {
        console.error("Unexpected null response from server");
        return [];
      }
      const { data } = response;
      if (!data) {
        console.error("Unexpected null data from server");
        return [];
      }
      return data;
    } catch (error) {
      console.error("Error getting books:", error);
      return [];
    }
  };

  const getBook = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/book/${id}`
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error(`Error getting book with id ${id}:`, error);
      return {};
    }
  };

  const getAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/author");
      const { data } = response || {};
      return data || [];
    } catch (error) {
      console.error("Error getting authors:", error);
      return [];
    }
  };

  const getAuthor = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/author/${id}`
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error(`Error getting author with id ${id}:`, error);
      return {};
    }
  };

  const getGenres = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/category");
      const { data } = response || {};
      return data || [];
    } catch (error) {
      console.error("Error getting genres:", error);
      return [];
    }
  };

  const getGenre = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/category/${id}`
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error(`Error getting genre with id ${id}:`, error);
      return {};
    }
  };

  const getPublishers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/publisher"
      );
      const { data } = response || {};
      return data || [];
    } catch (error) {
      console.error("Error getting publishers:", error);
      return [];
    }
  };

  const getPublisher = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/publisher/${id}`
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error(`Error getting publisher with id ${id}:`, error);
      return {};
    }
  };

  const postBook = async (book) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/book/",
        book
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error("Error posting book:", error);
      return {};
    }
  };

  const postAuthor = async (author) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/author/",
        author
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error("Error posting author:", error);
      return {};
    }
  };

  const postGenre = async (genre) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/category/",
        genre
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error("Error posting genre:", error);
      return {};
    }
  };

  const postPublisher = async (publisher) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/publisher/",
        publisher
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error("Error posting publisher:", error);
      return {};
    }
  };

  const updateBook = async (book) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/book/${book.barcode}/`,
        book
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error("Error updating book:", error);
      return {};
    }
  };

  const updateAuthor = async (author) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/author/${author.id}/`,
        author
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error("Error updating author:", error);
      return {};
    }
  };

  const updateGenre = async (genre) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/category/${genre.id}/`,
        genre
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error("Error updating genre:", error);
      return {};
    }
  };

  const updatePublisher = async (publisher) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/publisher/${publisher.id}/`,
        publisher
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error("Error updating publisher:", error);
      return {};
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/book/${id}`
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error("Error deleting book:", error);
      return {};
    }
  };

  const deleteAuthor = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/author/${id}`
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error("Error deleting author:", error);
      return {};
    }
  };

  const deleteGenre = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/category/${id}`
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error("Error deleting genre:", error);
      return {};
    }
  };

  const deletePublisher = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/publisher/${id}`
      );
      const { data } = response || {};
      return data || {};
    } catch (error) {
      console.error("Error deleting publisher:", error);
      return {};
    }
  };

  return {
    getBooks,
    getBook,
    getAuthors,
    getAuthor,
    getGenres,
    getGenre,
    getPublishers,
    getPublisher,
    postBook,
    postAuthor,
    postGenre,
    postPublisher,
    updateBook,
    updateAuthor,
    updateGenre,
    updatePublisher,
    deleteBook,
    deleteAuthor,
    deleteGenre,
    deletePublisher,
  };
};
