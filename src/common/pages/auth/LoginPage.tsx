import LoginForm from '@/common/components/auth/LoginForm';
import instance from '@/common/api/axios';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/customer/components/layout/Header';
import useAuthStore from '@/stores/useAuthStore';
import { registerFCMToken } from '@/common/fcm/fcmtoken-manage';

interface LoginResponse {
  id: number;
  email: string;
  userStatus: 'PENDING' | 'ACTIVE';
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = async (email: string, password: string, type: 'customer' | 'manager') => {
    try {
      const response = await instance.post<LoginResponse>(`/login/${type}`, {
        email,
        password,
      });

      const token = response.headers['authorization']?.replace('Bearer ', '') || '';

      localStorage.setItem('token', token);
      localStorage.setItem('userType', type);

      // Zustand store 업데이트
      await login(
        {
          ...response.data,
          userStatus: response.data.userStatus,
        },
        type
      );
      registerFCMToken();
      if (type === 'customer' && response.data.userStatus === 'PENDING') {
        navigate('/signupdetail');
        return response.data;
      }

      if (type === 'manager' && response.data.userStatus === 'PENDING') {
        navigate('/signupdetail');
        return response.data;
      }
      
      // 사용자 타입에 따라 리다이렉트
      navigate(type === 'customer' ? '/' : '/manager');
      return response.data;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showIcons={true} title="클린픽" showBack={false} />
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}; 