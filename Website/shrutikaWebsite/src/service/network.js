import axios from "axios";
axios.defaults.responseType = 'json';




// TODO: uncomment this after updating .env on live.
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const httpRequest = async ({ method, url, body = null, params = null }) => {
    try {
        const config = {
            method: method.toLowerCase(),
            url,
            headers: {
                "Content-Type": "application/json",
            }
        };

        // Only add data/params if they exist
        if (body) config.data = body;
        if (params) config.params = params;

        const response = await axios(config);
        
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        throw new Error(response.data.message || "Request failed");
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export { httpRequest }