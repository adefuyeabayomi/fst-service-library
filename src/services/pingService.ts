import axiosInstance from './axiosInstance'; // Adjust the import path as necessary

export interface EduEnrollmentType {
  course: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const pingService = {
  // Function to handle the ping endpoint
  ping: async () => {
    try {
      const response = await axiosInstance.get('/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Function to handle the status endpoint
  status: async () => {
    try {
      const response = await axiosInstance.get('/status');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Function to handle request logs
  getRequestLogs: async () => {
    try {
      const response = await axiosInstance.get('/request-logs');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Function to handle app logs
  getAppLogs: async () => {
    try {
      const response = await axiosInstance.get('/app-logs');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Function to clear request logs
  clearRequestLogs: async () => {
    try {
      const response = await axiosInstance.get('/clear-request-logs');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Function to clear app logs
  clearAppLogs: async () => {
    try {
      const response = await axiosInstance.get('/clear-app-logs');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Function to clear app logs
  eduEnrollment : async (data: EduEnrollmentType) => {
    try {
      const response = await axiosInstance.post('/class-enrollment',data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default pingService;
