import axiosInstance from './axiosInstance';

// Define types for the request and response data
export interface Message {
  message: string;
  sender: string; // User ID
}


export interface SendMessageResponse {
  messageId: string; // The ID of the sent message
}

export interface PaginatedMessagesResponse {
  messages: Message[];
  total: number; // Total number of messages
  page: number;
  limit: number;
}

export interface UserChat {
  chatId: string; // The ID of the chat
  lastMessage: string; // The last message in the chat
  participants: string[]; // Array of User IDs
  _id: string
}

export interface PaginatedChatsResponse {
  chats: UserChat[];
  total: number; // Total number of chats
  page: number;
  limit: number;
}

const chatService = {
  // Create a new chat or group chat
  createChat: async (data: { participants: string[]; groupName?: string; isGroupMessage: boolean}, token: string): Promise<UserChat> => {
    try {
      const response = await axiosInstance.post('/chats/create-chat', data,{headers: {
        Authorization: `Bearer ${token}`
      }});
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Send a new message
  sendMessage: async (chatId: string, messageData: Message, token: string): Promise<SendMessageResponse> => {
    try {
      const response = await axiosInstance.post(`/chats/${chatId}/messages`, messageData,{headers: {
        Authorization: `Bearer ${token}`
      }});
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Retrieve messages (paginated)
  getMessages: async (chatId: string, page: number = 1, limit: number = 10,token: string): Promise<PaginatedMessagesResponse> => {
    try {
      const response = await axiosInstance.get(`/chats/${chatId}/messages`, {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Mark messages as read
  markMessagesAsRead: async (chatId: string,token: string): Promise<void> => {
    try {
      await axiosInstance.patch(`/chats/${chatId}/messages/read`,{        headers: {
        Authorization: `Bearer ${token}`
      }})
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Delete a specific message
  deleteMessage: async (chatId: string, messageId: string,token: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/chats/${chatId}/messages/${messageId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Archive the chat for a user
  archiveChat: async (chatId: string,token: string): Promise<void> => {
    try {
      await axiosInstance.patch(`/chats/${chatId}/archive`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Unarchive the chat for a user
  unarchiveChat: async (chatId: string,token: string): Promise<void> => {
    try {
      await axiosInstance.patch(`/chats/${chatId}/unarchive`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
        
      );
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Mute the chat for a user
  muteChat: async (chatId: string,token: string): Promise<void> => {
    try {
      await axiosInstance.patch(`/chats/${chatId}/mute`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Unmute the chat for a user
  unmuteChat: async (chatId: string,token: string): Promise<void> => {
    try {
      await axiosInstance.patch(`/chats/${chatId}/unmute`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Leave a chat for a user
  leaveChat: async (chatId: string,token: string): Promise<void> => {
    try {
      await axiosInstance.patch(`/chats/${chatId}/leave`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Delete a chat
  deleteChat: async (chatId: string,token: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/chats/${chatId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Get all chats for a user (paginated)
  getUserChats: async (token: string, page: number = 1, limit: number = 10): Promise<PaginatedChatsResponse> => {
    try {
      const response = await axiosInstance.get(`/chats/user`, {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
};

export default chatService;
