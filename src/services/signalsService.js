// Signals Inbox data service
import { API_BASE_URL, fetchData } from './api';

// Mock data for development — replace with API calls when backend is ready
const MOCK_SIGNALS = {
    signals: [
        {
            id: 'signal_001',
            title: 'Route delay detected',
            category: 'Ai',
            system: 'Traffic Sensor Network',
            description: 'Repeated delays detected on Route A7 during peak hours, impacting delivery schedules.',
            timestamp: '2h ago',
            impactScore: 70,
            urgencyScore: 80,
            status: 'New',
        },
        {
            id: 'signal_002',
            title: 'Fuel Consumption Anomaly',
            category: 'IoT',
            system: 'Fleet Monitoring System',
            description: 'Unusual fuel consumption patterns identified for multiple vehicles over the last 48 hours..',
            timestamp: '6h ago',
            impactScore: 85,
            urgencyScore: 67,
            status: 'In Review',
        },
        {
            id: 'signal_003',
            title: 'Supply Chain Breach Alert',
            category: 'Security',
            system: 'Logistics Security Platform',
            description: 'Potential unauthorized access detected in warehouse management system logs.',
            timestamp: '12h ago',
            impactScore: 92,
            urgencyScore: 95,
            status: 'New',
        },
        {
            id: 'signal_004',
            title: 'Smart Contract Settlement Delay',
            category: 'Blockchain',
            system: 'Cargo Ledger Network',
            description: 'Blockchain transaction confirmations taking longer than expected for cross-border shipments.',
            timestamp: '1d ago',
            impactScore: 60,
            urgencyScore: 55,
            status: 'In Review',
        },
    ],
    total: 4,
    page: 1,
    limit: 10,
};

/**
 * Fetch signals with optional category filter.
 * Falls back to mock data if API is unavailable.
 */
export const getSignals = async (category = 'All') => {
    try {
        const query = category !== 'All' ? `?category=${category}` : '';
        const data = await fetchData(`/signals${query}`);
        return data;
    } catch {
        // Filter mock data locally for development
        if (category === 'All') return MOCK_SIGNALS;
        return {
            ...MOCK_SIGNALS,
            signals: MOCK_SIGNALS.signals.filter(s => s.category === category),
        };
    }
};

/**
 * Accept a signal by ID
 */
export const acceptSignal = async (signalId) => {
    try {
        const data = await fetchData(`/signals/${signalId}/accept`);
        return data;
    } catch {
        return { success: true, signalId, newStatus: 'Accepted' };
    }
};

/**
 * Reject a signal by ID
 */
export const rejectSignal = async (signalId) => {
    try {
        const data = await fetchData(`/signals/${signalId}/reject`);
        return data;
    } catch {
        return { success: true, signalId, newStatus: 'Rejected' };
    }
};
