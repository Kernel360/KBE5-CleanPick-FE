import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/customer/components/layout/Header';
import { FaRegUser, FaChevronRight, FaSignOutAlt } from 'react-icons/fa';
import { IoNotificationsOutline } from 'react-icons/io5';
import { BiMessageDetail } from 'react-icons/bi';
import useAuthStore from '@/stores/useAuthStore';
import instance from '@/customer/api/axios';

const MyPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, profile, logout, userType } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 요청
      await instance.post(`/logout`);
      
      // 로컬 스토리지 토큰 삭제
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      
      // Zustand store 초기화
      logout();
      
      // 로그인 페이지로 이동
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // 에러가 발생해도 로컬의 인증 정보는 삭제
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      logout();
      navigate('/login');
    }
  };

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
              {profile?.profileImageUrl ? (
                <img 
                  src={profile.profileImageUrl} 
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
              <h2 className="text-xl font-bold">{profile?.name || '사용자'}</h2>
            
            </div>
          </div>
        </div>

        {/* 메뉴 버튼들 */}
        <div className="mt-4 bg-white">
          <button 
            className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white"
            onClick={() => {navigate('/mypage/edit')}}
          >
            <div className="flex items-center gap-3">
              <FaRegUser className="text-gray-400" />
              <span className="text-gray-700">프로필 관리</span>
            </div>
            <FaChevronRight className="text-gray-400" />
          </button>

          <button 
            className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white"
            onClick={() => {navigate('/review')}}
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

          <button 
            className="w-full px-6 py-4 flex items-center justify-between bg-white text-red-500 border-t border-gray-100"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-3">
              <FaSignOutAlt className="text-red-500" />
              <span>로그아웃</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

