import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface SignUpFormProps {
  onSubmit: (email: string, password: string, type: 'customer' | 'manager') => Promise<void>;
}

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedType, setSelectedType] = useState<'customer' | 'manager'>('customer');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsLoading(true);
    try {
      await onSubmit(email, password, selectedType);
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
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

          <div className="relative space-y-1">
            <div className="text-sm font-medium mb-2">비밀번호</div>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-50 h-[50px]"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div className="relative space-y-1">
            <div className="text-sm font-medium mb-2">비밀번호 확인</div>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-50 h-[50px]"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#6366F1] text-white py-3 rounded-lg"
          >
            {isLoading ? '가입 중...' : '회원가입'}
          </Button>

          <div className="text-center text-sm text-gray-600">
            <span>이미 계정이 있으신가요? </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[#6366F1] font-semibold bg-white"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
