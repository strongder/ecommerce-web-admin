import api from '../api';

export const fetchNotificationByUser= async () => {
    try {
        const response = await api.get(`/notifications`);
        return response.data.result;
    } catch (error) {
        console.error('Failed to fetch notification', error);
    }
}