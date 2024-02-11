import axios from "axios"
const base = 'https://xaa39b5yq6.execute-api.us-east-1.amazonaws.com/Production';

const api = {
    add_consult: async (obj) => {
        try {
            const response = await axios.post(`${base}/add-consult`, obj);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    send_email: async (obj) => {
        try {
            const response = await axios.post(`${base}/email`, obj);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    send_refill_request: async (obj) => {
        try {
            const response = await axios.post(`${base}/refill`, obj);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    add_user: async (obj) => {
        try {
            const response = await axios.post(`${base}/add-user`, obj);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    }
}

export default api;