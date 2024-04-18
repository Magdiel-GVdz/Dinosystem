import axios from 'react'

export const useUser = () => {

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/users")
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
            console.error("Error getting users:", error)
            return []
        }

}

    const getUser = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/users/${id}`)
            const { data } = response || {}
            return data || {}
        } catch (error) {
            console.error(`Error getting user with id ${id}:`, error)
            return {}
        }
    }

    return {
        getUsers,
        getUser
    }

}

