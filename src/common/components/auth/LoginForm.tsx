import { useState, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

interface LoginFormProps {
  onSubmit: (email: string, password: string, type: 'customer' | 'manager') => Promise<{
    id: number;
    email: string;
    userStatus: 'PENDING' | 'ACTIVE';
  }>;
}

interface LocationState {
  email?: string;
  type?: 'customer' | 'manager';
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const [email, setEmail] = useState(state?.email || '');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedType, setSelectedType] = useState<'customer' | 'manager'>(state?.type || 'customer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(email, password, selectedType);
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl text-center mt-10 mb-10">회원 유형</h2>
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button
              type="button"
              onClick={() => setSelectedType('customer')}
              className={`flex-1 py-3 rounded-xl text-center transition-colors border-radius-[200px] ${
                selectedType === 'customer'
                  ? 'bg-[#6366F1] text-white shadow-sm'
                  : 'text-gray-500 bg-gray-100 hover:text-gray-700'
              }`}
            >
              수요자 (고객)
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('manager')}
              className={`flex-1 py-3 border-radius-[200px] text-center transition-colors ${
                selectedType === 'manager'
                  ? 'bg-[#6366F1] text-white shadow-sm'
                  : 'text-gray-500 bg-gray-100 hover:text-gray-700'
              }`}
            >
              공급자 (매니저)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <div className="text-sm font-medium mb-2">이메일</div>
            <Input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-50 h-[50px]"
              placeholder="이메일 주소를 입력하세요"
            />
          </div>

          <div className="relative">
            <div className="text-sm font-medium mb-2">비밀번호</div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg pr-10 bg-gray-50 h-[50px]"
                placeholder="비밀번호를 입력하세요"
              />
             
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-[#6366F1] bg-white"
            >
              비밀번호를 잊으셨나요?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#6366F1] text-white py-3 rounded-lg"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg bg-white text-black"
            >
              <FaFacebook className="text-blue-600" size={20} />
              페이스북으로 계속하기
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg bg-white text-black"
            >
              <FcGoogle size={20} />
              구글로 계속하기
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <span>계정이 없으신가요? </span>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-[#6366F1] font-semibold bg-white"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 