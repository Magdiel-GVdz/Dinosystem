import axios from "axios"

export const useDonations = () => {

    const getDonations = async () => {
        
        try {
            const response = await axios.get("http://localhost:8000/api/v1/donations")
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
            console.error("Error getting donations:", error)
            return []
        }
    }

    const getDonation = async (id) => {

        try {
            const response = await axios.get(`http://localhost:8000/api/v1/donations/${id}`)
            const { data } = response || {}
            return data || {}
        } catch (error) {
            console.error(`Error getting donation with id ${id}:`, error)
            return {}
        }
    }

    const createDonation = async (data) => {

        try {
            const response = await axios.post("http://localhost:8000/api/v1/donations/create/", data)
            const { data: serverData } = response || {}
            if (!serverData) {
                console.error("Unexpected null data from server")
                return []
            }
            return serverData
        } catch (error) {
            console.error("Error creating donation:", error)
            alert("An error occurred while donating the book:", error.message);
            return []
        }
    }


    const myDonations = async () => {

        try {
            const response = await axios.get("http://localhost:8000/api/v1/donations/my")
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
            console.error("Error getting my donations:", error)
            return []
        }
    }
    
    return { getDonations, getDonation, createDonation, myDonations }

}