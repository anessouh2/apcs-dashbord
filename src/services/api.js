// API service configuration
export const API_BASE_URL = 'https://api.example.com';

export const fetchData = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
};
