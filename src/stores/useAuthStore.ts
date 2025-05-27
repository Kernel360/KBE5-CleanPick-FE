import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserType = 'customer' | 'manager'
type UserStatus = 'PENDING' | 'ACTIVE'

interface User {
  id: number
  email: string
  status: UserStatus
}

interface AuthState {
  user: User | null
  userType: UserType | null
  isAuthenticated: boolean
  login: (userData: User, type: UserType) => void
  logout: () => void
  setUserType: (type: UserType) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      userType: null,
      isAuthenticated: false,
      login: (userData, type) => 
        set({ user: userData, isAuthenticated: true, userType: type }),
      logout: () => 
        set({ user: null, isAuthenticated: false, userType: null }),
      setUserType: (type) => 
        set({ userType: type })
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore 