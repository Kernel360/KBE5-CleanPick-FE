import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import instance from '@/customer/api/axios'

type UserType = 'customer' | 'manager'
type UserStatus = 'PENDING' | 'ACTIVE'

interface User {
  id: number
  email: string
  userStatus: UserStatus
}

interface CustomerProfile {
  name: string
  phoneNumber: string
  profileImageUrl: string | null
  mainAddress: string
  subAddress: string
  latitude?: number
  longitude?: number
  address?: string
}

interface ManagerProfile {
  name: string
  phoneNumber: string
  profileImageUrl: string | null
  profileMessage: string | null
  mainAddress: string
  subAddress: string
  latitude?: number
  longitude?: number
  address?: string
}

interface ApiResponse<T> {
  data: T
  code: string
  message: string
  success: boolean
}

interface AuthState {
  user: User | null
  userType: UserType | null
  isAuthenticated: boolean
  profile: CustomerProfile | ManagerProfile | null
  login: (userData: User, type: UserType) => Promise<void>
  logout: () => void
  setUserType: (type: UserType) => void
  fetchProfile: () => Promise<void>
  updateUserStatus: (status: UserStatus) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      userType: null,
      isAuthenticated: false,
      profile: null,
      login: async (userData, type) => {
        set({ user: userData, isAuthenticated: true, userType: type })
        const store = useAuthStore.getState()
        store.fetchProfile()  
      },
      logout: () => 
        set({ user: null, isAuthenticated: false, userType: null, profile: null }),
      setUserType: (type) => 
        set({ userType: type }),
      fetchProfile: async () => {
        try {
          let response;
          console.log("fetchProfile")
          if(useAuthStore.getState().userType === 'customer') {
            response = await instance.get<ApiResponse<CustomerProfile>>('/customers')
          } else {
            response = await instance.get<ApiResponse<ManagerProfile>>('/manager')
          }
          if (response.data.success) {  
            set({ profile: response.data.data })
          }
        } catch (error) {
          console.error('프로필 정보 로딩 실패:', error)
        }
      },
      updateUserStatus: (status) => 
        set((state) => ({
          user: state.user ? { ...state.user, userStatus: status } : null
        }))
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore 