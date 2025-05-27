import { useNavigate } from 'react-router-dom';
import SignUpForm from '@/common/components/auth/SignUpForm';
import instance from '@/common/api/axios';
import HeaderNav from '@/manager/layer/HeaderNav';

interface SignUpResponse {
  token: string;
  user: {
    id: string;
    email: string;
    type: 'customer' | 'manager';
  };
}

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUp = async (email: string, password: string, type: 'customer' | 'manager') => {
    try {
      const endpoint = type === 'customer' ? '/signup/customer' : '/signup/manager';
      await instance.post<SignUpResponse>(endpoint, {
        email,
        password,
        type
      });
      
      navigate('/login', { 
        state: { 
          email,
          type
        }
      });
    } catch (error) {
      console.error('회원가입 에러:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <HeaderNav showBack={true} title="회원가입" />
        <SignUpForm onSubmit={handleSignUp} />
    </div>
  );
} 