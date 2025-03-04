import axios from "axios"

export const usePromo = () => {
    
    const getPromos = async () => {
        
        try {
            const response = await axios.get("http://localhost:8000/api/v1/promos")
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


    const getPromo = async (id) => {

        try {
            const response = await axios.get(`http://localhost:8000/api/v1/promos/${id}`)
            const { data } = response || {}
            return data || {}
    }

        catch (error) {
            console.error(`Error getting promo with id ${id}:`, error)
            return {}
        }
    }

    const postPromo = async (promos) => {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/v1/promos/",
            promos
          );
          const { data } = response || {};
          return data || {};
        } catch (error) {
          console.error("Error posting promos:", error);
          alert("An error occurred while creating the promo:", error.message);
          return {};
        }
      }

   
    return { getPromos, getPromo ,postPromo }
}