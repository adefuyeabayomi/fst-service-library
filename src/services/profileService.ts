import axiosInstance from './axiosInstance';

interface ProfileResponse {
  message: string;
  data?: any;
}

interface ProfileData {
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string; // Consider using a Date type if applicable
  bio?: string;
  location?: string;
  website?: string;
  username?: string;
  // Add other fields as needed
}

const profileService = {
  // Create a new profile
  createProfile: async (profileData: ProfileData, token: string): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.post<ProfileResponse>(
        '/profile',
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Get a profile by user ID
  getProfile: async (userId: string, token: string): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.get<ProfileResponse>(
        `/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Update a profile
  updateProfile: async (userId: string, profileData: ProfileData, token: string): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.put<ProfileResponse>(
        `/profile/${userId}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Upload profile image and update profile
  uploadProfileImage: async (files: File[] | File, token: string, userId:string): Promise<ProfileResponse> => {
    const formData = new FormData();
    if(Array.isArray(files)){
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }
    else {
      formData.append('files', files)
    }
    console.log(formData,files)
    try {
      const response = await axiosInstance.post<ProfileResponse>(
        `/profile/${userId}/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  deleteProfile: async (userId: string, token: string): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.delete<ProfileResponse>(
        `/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Get all profiles with pagination
  getProfiles: async (page: number, token: string): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.get<ProfileResponse>(
        `/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  // Search profiles based on query parameters
  searchProfiles: async (query: Record<string, any>, token: string): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.get<ProfileResponse>(
        `/profile/search`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: query,
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};

export default profileService;
