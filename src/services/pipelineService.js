// Innovation Pipeline data service
import { API_BASE_URL, fetchData } from './api';

const MOCK_PIPELINE = {
    stages: [
        { id: 'signals', name: 'Signals', count: 24 },
        { id: 'opportunity-sheet', name: 'Opportunity sheet', count: 17 },
        { id: 'feasibility-study', name: 'Feasibility Study', count: 9 },
        { id: 'poc', name: 'POC', count: 5 },
        { id: 'project', name: 'Project', count: 3 },
    ],
    recentProjects: [
        {
            id: 'proj_001',
            stage: 'signals',
            stageName: 'Signal',
            title: 'AI-Powered Cargo Tracking',
            description:
                'Real-time cargo monitoring using computer vision and ML algorithms',
            source: 'Patent API',
            status: 'Ready to classify',
            statusColor: 'orange',
            timestamp: '2h ago',
            actionLabel: 'Review Signal',
        },
        {
            id: 'proj_002',
            stage: 'opportunity-sheet',
            stageName: 'Opportunity sheet',
            title: 'IoT Predictive Maintenance System',
            description:
                'Sensor-based equipment monitoring to predict failures before they occur',
            source: 'Industry Report',
            status: 'Ready to advance',
            statusColor: 'orange',
            timestamp: '5h ago',
            actionLabel: 'View Opportunity',
        },
    ],
};

const MOCK_STAGE_PROJECTS = {
    signals: [
        {
            id: 'proj_001',
            title: 'AI-Powered Cargo Tracking',
            description: 'Real-time cargo monitoring using computer vision and ML algorithms',
            source: 'Patent API',
            status: 'Ready to classify',
            statusColor: 'orange',
            timestamp: '2h ago',
            actionLabel: 'Review Signal',
        },
        {
            id: 'proj_003',
            title: 'Blockchain Supply Chain Verification',
            description: 'Distributed ledger system for end-to-end supply chain transparency',
            source: 'Research Paper',
            status: 'Ready to classify',
            statusColor: 'orange',
            timestamp: '1d ago',
            actionLabel: 'Review Signal',
        },
    ],
};

/**
 * Fetch pipeline overview (stages + recent projects).
 */
export const getPipelineOverview = async () => {
    try {
        const data = await fetchData('/pipeline/overview');
        return data;
    } catch {
        return MOCK_PIPELINE;
    }
};

/**
 * Fetch projects for a specific pipeline stage.
 */
export const getStageProjects = async (stageId) => {
    try {
        const data = await fetchData(`/pipeline/stages/${stageId}/projects`);
        return data;
    } catch {
        return {
            projects: MOCK_STAGE_PROJECTS[stageId] || [],
        };
    }
};
