// Alert Rules service
import { API_BASE_URL } from './api';

/**
 * Create a new alert rule.
 */
export const createAlertRule = async (ruleData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/alert-rules`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: ruleData.alertName,
                categories: Object.keys(ruleData.categories).filter(
                    (key) => ruleData.categories[key] && key !== 'allCategories'
                ),
                minimumImpactScore: ruleData.minimumScores.impact,
                minimumUrgencyScore: ruleData.minimumScores.urgency,
            }),
        });
        return response.json();
    } catch {
        // Mock successful response for development
        console.warn('Create alert rule API failed, using mock response');
        return {
            id: 'rule_' + Date.now(),
            name: ruleData.alertName,
            categories: Object.keys(ruleData.categories).filter(
                (key) => ruleData.categories[key] && key !== 'allCategories'
            ),
            minimumImpactScore: ruleData.minimumScores.impact,
            minimumUrgencyScore: ruleData.minimumScores.urgency,
            createdAt: new Date().toISOString(),
            isActive: true,
        };
    }
};

/**
 * Get all alert rules.
 */
export const getAlertRules = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/alert-rules`);
        return response.json();
    } catch {
        return { rules: [] };
    }
};

/**
 * Delete an alert rule.
 */
export const deleteAlertRule = async (ruleId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/alert-rules/${ruleId}`, {
            method: 'DELETE',
        });
        return response.json();
    } catch {
        return { success: true };
    }
};
