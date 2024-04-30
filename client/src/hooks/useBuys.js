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
            console.error("Error getting promos:", error)
            return []
        }
    }
    
    return { getBuys }
}