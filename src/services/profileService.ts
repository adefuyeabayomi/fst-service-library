import axiosInstance from './axiosInstance';

export interface ProfileResponse {
  message: string;
  data?: any;
}


export interface ProfileData {
  user?: string;          // Reference to the Auth model
  username: string;              // Randomly generated username if not provided
  profileImage: string;          // Profile image URL (can be empty)
  firstName: string;             // First name of the user (optional)
  lastName: string;              // Last name of the user (optional)
  gender: 'Male' | 'Female' | 'Other'; // Enum for gender with default as 'Other'
  dateOfBirth: Date | null;      // Date of birth (can be null)
  bio: string;                   // User bio (optional)
  location: string;              // Location of the user (optional)
  website: string;               // User's website URL (optional)
  created: Date;                 // Date when the profile was created
  deleted: boolean;              // Boolean indicating if the profile is deleted
  socketId?: string;             // Optional socket ID for real-time communication
  online: boolean;               // Boolean indicating if the user is online
}

const profileService = {
  // Create a new profile
  createProfile: async (profileData: Partial<ProfileData>, token: string): Promise<ProfileResponse> => {
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
  getProfile: async (userId: string, token: string): Promise<ProfileData> => {
    try {
      const response = await axiosInstance.get<ProfileData>(
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
