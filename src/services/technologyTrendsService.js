// Technology Trends data service
import { API_BASE_URL, fetchData } from './api';

// Mock data for development — replace with API calls when backend is ready
const MOCK_TRENDS_DATA = {
    trends: [
        { week: 'week 1', ai: 25, blockchain: 15 },
        { week: 'week2', ai: 85, blockchain: 40 },
        { week: 'week 3', ai: 19, blockchain: 55 },
        { week: 'week 3', ai: 4, blockchain: 0 },
        { week: 'week 4', ai: 20, blockchain: 60 },
        { week: 'week 5', ai: 50, blockchain: 35 },
        { week: 'week 6', ai: 10, blockchain: 72 },
        { week: 'week 7', ai: 75, blockchain: 55 },
        { week: 'week 8', ai: 90, blockchain: 90 },
    ]
};

const MOCK_RADAR_DATA = {
    radarData: [
        { name: 'Research', value: 30 },
        { name: 'Development', value: 30 },
        { name: 'Deployment', value: 50 },
        { name: 'Demo', value: 65 },
    ]
};

/**
 * Fetch technology trends data from API.
 * Falls back to mock data if API is unavailable.
 */
export const getTechnologyTrends = async () => {
    try {
        const data = await fetchData('/technology-trends');
        return data;
    } catch {
        // Return mock data for development
        return MOCK_TRENDS_DATA;
    }
};

/**
 * Fetch radar chart data from API.
 * Falls back to mock data if API is unavailable.
 */
export const getRadarData = async () => {
    try {
        const data = await fetchData('/radar-data');
        return data;
    } catch {
        // Return mock data for development
        return MOCK_RADAR_DATA;
    }
};
