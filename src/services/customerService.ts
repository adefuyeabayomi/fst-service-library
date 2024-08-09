import axiosInstance from "./axiosInstance";

export interface CustomerMessage {
  email: string;
  message: string;
  created: string;
  replied: boolean;
  _id:string;
}

export interface ReplyResponse {
  message: string;
}

// Interface for the response when fetching customer messages
export interface GetCustomerMessagesResponse extends Array<CustomerMessage> {}

const customerSupportService = {
  // Send a customer message
  postCustomerMessage: async (email: string, message: string): Promise<ReplyResponse> => {
    try {
        const response = await axiosInstance.post('/messages', { email, message });
        return response.data
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Admin replies to a customer message
  replyToCustomerMessage: async (messageId: string, replyMessage: string,token:string): Promise<ReplyResponse> => {
    try {
      const response = await axiosInstance.post(`/messages/reply/${messageId}`, { replyMessage },
        { headers: {Authorization: `Bearer ${token}`}});
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  },

  // Get customer messages with optional query parameters
  getCustomerMessages: async (queryParams?: {
    replied?: boolean;
    startDate?: string;
    endDate?: string;
  }): Promise<GetCustomerMessagesResponse> => {
    try {
      // Construct query string from queryParams
      const queryString = new URLSearchParams(queryParams as any).toString();
      const response = await axiosInstance.get(`/messages?${queryString}`);
      return response.data;
    } catch (error) {
      throw error; // Pass the error to the caller
    }
  }
};

export default customerSupportService;
