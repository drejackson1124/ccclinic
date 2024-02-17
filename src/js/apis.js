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
    },
    provider_log: async (username, password) => {
        try {
            const response = await axios.post(`${base}/employee-login`, {username, password});
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    get_refill_requests: async () => {
        try {
            const response = await axios.get(`${base}/get-requests`);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    get_consult_requests: async () => {
        try {
            const response = await axios.get(`${base}/get-consult-requests`);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    get_archived_requests: async () => {
        try {
            const response = await axios.get(`${base}/get-archived-requests`);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    mark_as_fulfilled: async (email) => {
        try {
            const response = await axios.post(`${base}/refill-fulfilled`, {email});
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    consult_fulfilled: async (email, consultDate) => {
        try {
            const response = await axios.post(`${base}/consult-fulfilled`, {email, consultDate});
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    schedule_consult: async () => {
        try {
            const response = await axios.get(`${base}/schedule-consult`);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    send_scheduled_consult: async (obj) => {
        try {
            const response = await axios.post(`${base}/schedule-consult`, obj);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    get_consults: async () => {
        try {
            const response = await axios.get(`${base}/upcoming-consults`);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    add_employee: async (obj) => {
        try {
            const response = await axios.post(`${base}/add-employee`, obj);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    archive_consult_request: async (obj) => {
        try {
            const response = await axios.post(`${base}/archive_consult`, obj);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: "Unknown error" };
        }
    },
    
}

export default api;