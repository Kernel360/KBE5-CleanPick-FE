import LoginForm from '@/common/components/auth/LoginForm';
import instance from '@/common/api/axios';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '@/manager/layer/HeaderNav';

interface LoginResponse {
  id: number;
  email: string;
  status: 'PENDING' | 'ACTIVE';
}

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string, type: 'customer' | 'manager') => {
    try {
      const response = await instance.post<LoginResponse>(`/login/${type}`, {
        email,
        password,
      });

      const token = response.headers['authorization'];
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userType', type);
      }
      
      if (type === 'customer' && response.data.status === 'PENDING') {
        navigate('/signupdetail');
        return response.data;
      }

      if (type === 'manager' && response.data.status === 'PENDING') {
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
      <HeaderNav showBack={true} title="로그인" />
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
} 