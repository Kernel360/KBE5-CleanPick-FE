import React from 'react';
import { Header } from '@/customer/components/layout/Header';
import { FaRegUser, FaChevronRight } from 'react-icons/fa';
import { IoNotificationsOutline } from 'react-icons/io5';
import { BiMessageDetail } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  nickname: string;
  profileImage?: string;
}

// 임시 데이터 (나중에 API 연동으로 대체)
const tempUserProfile: UserProfile = {
  nickname: "홍길동",
  // profileImage: "https://example.com/profile.jpg" // 이미지 있을 때 테스트용
};

const MyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="마이페이지"
        showBack={true}
      />
      
      <div className="pt-[3.5rem]">
        {/* 프로필 섹션 */}
        <div className="bg-white py-8">
          <div className="flex flex-col items-center">
            {/* 프로필 이미지 */}
            <div className="w-24 h-24">
              {tempUserProfile.profileImage ? (
                <img 
                  src={tempUserProfile.profileImage} 
                  alt="프로필" 
                  className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                  <FaRegUser className="w-10 h-10 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* 사용자 정보 */}
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold">{tempUserProfile.nickname}</h2>
            </div>
          </div>
        </div>

        {/* 메뉴 버튼들 */}
        <div className="mt-4 bg-white">
          <button 
            className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white"
            onClick={() => {navigate('/customer/mypage/edit')}}
          >
            <div className="flex items-center gap-3">
              <FaRegUser className="text-gray-400" />
              <span className="text-gray-700">프로필 관리</span>
            </div>
            <FaChevronRight className="text-gray-400" />
          </button>

          <button 
            className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white"
            onClick={() => {navigate('/customer/review')}}
          >
            <div className="flex items-center gap-3">
              <BiMessageDetail className="text-gray-400" />
              <span className="text-gray-700">나의 리뷰</span>
            </div>
            <FaChevronRight className="text-gray-400" />
          </button>

          <button 
            className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white"
            onClick={() => {/* 알림 설정으로 이동 */}}
          >
            <div className="flex items-center gap-3">
              <IoNotificationsOutline className="text-gray-400" />
              <span className="text-gray-700">알림 설정</span>
            </div>
            <FaChevronRight className="text-gray-400" />
          </button>

          <button 
            className="w-full px-6 py-4 flex items-center justify-between bg-white"
            onClick={() => {/* 고객 센터로 이동 */}}
          >
            <div className="flex items-center gap-3">
              <BiMessageDetail className="text-gray-400" />
              <span className="text-gray-700">고객 센터</span>
            </div>
            <FaChevronRight className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

