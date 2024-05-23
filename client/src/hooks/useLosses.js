import axios from "axios"

export const useLosses = () => {

    const getLosses = async () => {
        
        try {
            const response = await axios.get("http://localhost:8000/api/v1/losses")
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
            console.error("Error getting buys:", error)
            return []
        }
    }

    const getLosse = async (id) => {

        try {
            const response = await axios.get(`http://localhost:8000/api/v1/losses/${id}`)
            const { data } = response || {}
            return data || {}
        } catch (error) {
            console.error(`Error getting buy with id ${id}:`, error)
            return {}
        }
    }

    const createLosse = async (data) => {

        try {
            const response = await axios.post("http://localhost:8000/api/v1/losses/create/", data)
            const { data: serverData } = response || {}
            if (!serverData) {
                console.error("Unexpected null data from server")
                return []
            }
            return serverData
        } catch (error) {
            console.error("Error creating buy:", error)
            return []
        }
    }


    const myLosses = async () => {

        try {
            const response = await axios.get("http://localhost:8000/api/v1/losses/my")
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
            console.error("Error getting my buys:", error)
            return []
        }
    }
    
    return { getLosses, getLosse, createLosse, myLosses }
}