// notificationService.ts
import axiosInstance from './axiosInstance';

const notificationService = {
  // Create a new notification
  createNotification: async (data: { title: string; message: string; userId: string }) => {
    try {
      const response = await axiosInstance.post('/notifications', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error creating notification');
    }
  },

  // Get all notifications with pagination
  getAllNotifications: async (page: number = 1) => {
    try {
      const response = await axiosInstance.get(`/notifications?page=${page}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error fetching notifications');
    }
  },

  // Get notification by ID
  getNotificationById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/notifications/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error fetching notification by ID');
    }
  },

  // Mark notification as read
  markAsRead: async (id: string) => {
    try {
      const response = await axiosInstance.patch(`/notifications/${id}/read`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error marking notification as read');
    }
  },

  // Delete notification by ID
  deleteNotification: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/notifications/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error deleting notification');
    }
  },
};

export default notificationService;
