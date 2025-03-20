// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const fetchContacts = async () => {
    try {
        const response = await axios.get(`${API_URL}/kontak`);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw error; // Rethrow the error for further handling
    }
};
