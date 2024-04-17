import axios from "axios"

export const useBook = () => {

    const getBooks = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/book")
            if (!response) {
                console.error("Unexpected null response from server")
                return []
            }
            const { data } = response
            if (!data) {
                console.error("Unexpected null data from server")
                return []
            }
            return data
        } catch (error) {
            console.error("Error getting books:", error)
            return []
        }
    }


    const getBook = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/book/${id}`)
            const { data } = response || {}
            return data || {}
        } catch (error) {
            console.error(`Error getting book with id ${id}:`, error)
            return {}
        }
    }

    const getAuthors = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/author")
            const { data } = response || {}
            return data || []
        } catch (error) {
            console.error("Error getting authors:", error)
            return []
        }
    }

    const getAuthor = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/author/${id}`)
            const { data } = response || {}
            return data || {}
        } catch (error) {
            console.error(`Error getting author with id ${id}:`, error)
            return {}
        }
    }

    const getGenres = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/category")
            const { data } = response || {}
            return data || []
        } catch (error) {
            console.error("Error getting genres:", error)
            return []
        }
    }

    const getGenre = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/category/${id}`)
            const { data } = response || {}
            return data || {}
        } catch (error) {
            console.error(`Error getting genre with id ${id}:`, error)
            return {}
        }
    }

    const getPublishers  = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/publisher")
            const { data } = response || {}
            return data || []
        } catch (error) {
            console.error("Error getting publishers:", error)
            return []
        }
    }

    const getPublisher = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/publisher/${id}`)
            const { data } = response || {}
            return data || {}
        } catch (error) {
            console.error(`Error getting publisher with id ${id}:`, error)
            return {}
        }
    }

    return { getBooks, getBook, getAuthors, getAuthor, getGenres, getGenre, getPublishers, getPublisher }
}

