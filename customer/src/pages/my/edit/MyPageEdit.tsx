import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface UserProfile {
  nickname: string;
  email: string;
  profileImage?: string;
}

// 임시 데이터 (나중에 API 연동으로 대체)
const tempUserProfile: UserProfile = {
  nickname: "홍길동",
  email: "qwer1234@gmail.com",

  // profileImage: "https://example.com/profile.jpg" // 이미지 있을 때 테스트용
};

const MyPageEdit: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>(tempUserProfile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동
    navigate('/mypage');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        title="프로필 수정"
        showBack={true}
      />
      
      <div className="pt-[3.5rem] px-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 프로필 이미지 섹션 */}
          <div className="flex justify-center py-8">
            <div className="relative">
              <div className="w-24 h-24">
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt="프로필" 
                    className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                    <FaRegUser className="w-10 h-10 text-gray-400" />
                  </div>
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                onClick={() => {/* TODO: 이미지 업로드 구현 */}}
              >
                <span className="text-lg">+</span>
              </button>
            </div>
          </div>

          {/* 입력 필드들 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
              <input
                type="text"
                value={profile.nickname}
                onChange={(e) => setProfile({...profile, nickname: e.target.value})}
                className={cn(
                  "w-full px-4 py-3 rounded-lg",
                  "border border-gray-300 focus:border-primary",
                  "outline-none transition-colors"
                )}
                placeholder="닉네임을 입력해주세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className={cn(
                  "w-full px-4 py-3 rounded-lg",
                  "border border-gray-300 focus:border-primary",
                  "outline-none transition-colors"
                )}
                placeholder="이메일을 입력해주세요"
                disabled
              />
            </div>

          </div>

          {/* 수정하기 버튼 */}
          <button
            type="submit"
            className={cn(
              "w-full py-4 rounded-lg",
              "bg-primary text-white font-medium",
              "hover:bg-primary/90 transition-colors",
              "mt-8"
            )}
          >
            수정하기
          </button>

          {/* 회원 탈퇴 링크 */}
          <div className="text-center mt-4">
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-gray-700 bg-white"
              onClick={() => {/* TODO: 회원 탈퇴 구현 */}}
            >
              회원 탈퇴하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyPageEdit; 