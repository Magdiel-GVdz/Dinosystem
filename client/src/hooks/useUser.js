import axios from 'axios'

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

    const postUsers = async (user) => {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/v1/users/",
            user
          );
          const { data } = response || {};
          return data || {};
        } catch (error) {
          console.error("Error posting user:", error);
          alert("An error occurred while creating the user:", error.message);
          return {};
        }
      }

      const postSuperUsers = async (user) => {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/v1/users/superuser/",
            user
          );
          const { data } = response || {};
          return data || {};
        } catch (error) {
          console.error("Error posting user:", error);
          alert("An error occurred while creating the Superuser:", error.message);
          return {};
        }
      }

      const updateUser = async (user) => {
        try {
          const response = await axios.patch(
            `http://localhost:8000/api/v1/users/${user.id}/`,
            user
          );
          const { data } = response || {};
          return data || {};
        } catch (error) {
          console.error("Error updating user:", error);
          return {};
        }
      };

      
    

    return {
        getUsers,
        getUser,
        postUsers,
        updateUser,
        postSuperUsers
    }


}

