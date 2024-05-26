import axios from "axios"

export const useSales = () => {

    const getSales = async () => {
        
        try {
            const response = await axios.get("http://localhost:8000/api/v1/sales")
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
            console.error("Error getting sales:", error)
            return []
        }
    }

    const getSale = async (id) => {

        try {
            const response = await axios.get(`http://localhost:8000/api/v1/sales/${id}`)
            const { data } = response || {}
            return data || {}
        } catch (error) {
            console.error(`Error getting sale with id ${id}:`, error)
            return {}
        }
    }

    const createSale = async (data) => {

        try {
            const response = await axios.post("http://localhost:8000/api/v1/sales/create/", data)
            const { data: serverData } = response || {}
            if (!serverData) {
                console.error("Unexpected null data from server")
                return []
            }
            return serverData
        } catch (error) {
            console.error("Error creating sale:", error)
            return []
        }
    }


    const mySales = async () => {

        try {
            const response = await axios.get("http://localhost:8000/api/v1/sales/my")
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
            console.error("Error getting my sales:", error)
            return []
        }
    }
    
    return { getSales, getSale, createSale, mySales }
}