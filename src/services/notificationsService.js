// Notifications & Alerts data service
import { API_BASE_URL, fetchData } from './api';

// Mock data for development — replace with API calls when backend is ready
const MOCK_NOTIFICATIONS = {
    notifications: [
        {
            id: 'notif_001',
            timeGroup: '2h ago',
            title: 'High Impact AI Technologies (3 new matches)',
            items: [
                'AI-Powered Port Automation System',
                'MachineLearning for Cargo Prediction',
                'Neural Network Traffic Optimization',
            ],
            category: 'AI',
            timestamp: '2026-02-06T14:00:00Z',
            isRead: false,
        },
        {
            id: 'notif_002',
            timeGroup: 'Yesterday',
            timeDetail: '15:30',
            title: 'Blockchain Breakthroughs (1 new match)',
            items: ['Smart Contract for Automated Payments'],
            category: 'Blockchain',
            timestamp: '2026-02-05T15:30:00Z',
            isRead: true,
        },
    ],
    unreadCount: 5,
};

/**
 * Fetch notifications from API.
 * Falls back to mock data if API is unavailable.
 */
export const getNotifications = async () => {
    try {
        const data = await fetchData('/notifications');
        return data;
    } catch {
        return MOCK_NOTIFICATIONS;
    }
};

/**
 * Create a new alert rule.
 */
export const createAlertRule = async (ruleData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/alert-rules`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ruleData),
        });
        return response.json();
    } catch {
        console.warn('Create alert rule failed, using mock response');
        return { success: true, id: 'rule_' + Date.now() };
    }
};

/**
 * Mark a notification as read.
 */
export const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/notifications/${notificationId}/read`,
            { method: 'PATCH' }
        );
        return response.json();
    } catch {
        return { success: true };
    }
};
