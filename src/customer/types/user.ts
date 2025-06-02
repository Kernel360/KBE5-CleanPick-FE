export interface UserProfile {
  name: string;
  phoneNumber: string;
  profileImageUrl: string | null;
  mainAddress: string;
  subAddress: string;
}

export interface ApiResponse<T> {
  data: T;
  code: string;
  message: string;
  success: boolean;
} 