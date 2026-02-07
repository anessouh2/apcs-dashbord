// Authentication service
import { API_BASE_URL } from './api';

/**
 * Login with email and password.
 * Falls back to mock for development.
 */
export const loginAPI = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Invalid email or password');
        }
        return data;
    } catch (err) {
        // Mock: accept any non-empty credentials for dev
        if (
            credentials.email &&
            credentials.password &&
            credentials.password.length >= 6
        ) {
            return {
                success: true,
                token: 'mock_jwt_' + Date.now(),
                user: {
                    id: 'user_001',
                    email: credentials.email,
                    name: 'Admin User',
                    role: 'admin',
                },
            };
        }
        throw new Error(err.message || 'Invalid email or password');
    }
};

/**
 * Verify an existing token.
 */
export const verifyToken = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        return data;
    } catch {
        // Mock: if token exists, treat as valid
        if (token) {
            return {
                id: 'user_001',
                email: 'admin@apcs.com',
                name: 'Admin User',
                role: 'admin',
            };
        }
        throw new Error('Token invalid');
    }
};

/**
 * Logout - clear stored token.
 */
export const logoutAPI = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
};
