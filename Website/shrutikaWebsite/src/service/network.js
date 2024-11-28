import axios from "axios";
axios.defaults.responseType = 'json';




// TODO: uncomment this after updating .env on live.
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const httpRequest = async ({ method, url, body, params }) => {
    console.log("**** hello ****", method, url, body, params);
    try {
        const response = await axios({
            method: method.toLowerCase(),
            url,
            data: body || null,
            params: params || null,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status) {
            return response.data;
        } else {
            throw new Error("Something Went wrong ");
        }
    } catch (error) {
        console.log('inside catch', error);
        throw error;
    }
}

export { httpRequest }