import config from "@/config";
import axios from "axios";

export const apiClient = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
        'Authorization': `Bearer ${config.api.accessToken}`
    }
})

