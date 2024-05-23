import axios from "axios"

export const useBuys = () => {

    const getBuys = async () => {
        
        try {
            const response = await axios.get("http://localhost:8000/api/v1/buys")
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

    const getBuy = async (id) => {

        try {
            const response = await axios.get(`http://localhost:8000/api/v1/buys/${id}`)
            const { data } = response || {}
            return data || {}
        } catch (error) {
            console.error(`Error getting buy with id ${id}:`, error)
            return {}
        }
    }

    const createBuy = async (data) => {

        try {
            const response = await axios.post("http://localhost:8000/api/v1/buys/create/", data)
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


    const myBuys = async () => {

        try {
            const response = await axios.get("http://localhost:8000/api/v1/buys/my")
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
    
    return { getBuys, getBuy, createBuy, myBuys }
}