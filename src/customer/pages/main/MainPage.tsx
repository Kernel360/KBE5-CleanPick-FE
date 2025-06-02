import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/customer/components/layout/Header';
import { Banner } from '@/customer/components/home/Banner';
import { ServiceSection } from '@/customer/components/home/ServiceSection';
import { ManagerSection } from '@/customer/components/home/ManagerSection';
import { ReviewSection } from '@/customer/components/home/ReviewSection';
import useAuthStore from '@/stores/useAuthStore';

const MainPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType } = useAuthStore();

  useEffect(() => {
    // 로그인이 되어있고, 매니저인 경우에만 리다이렉트
    if (isAuthenticated && userType === 'manager') {
      navigate('/manager');
    }
  }, [isAuthenticated, userType, navigate]);

  return (
    <div className="min-h-screen relative">
      <Header 
        title="클린픽"
        showIcons={true}
      />
      <Banner />
      <ServiceSection />
      <ManagerSection />
      <ReviewSection />
    </div>
  );
};

export default MainPage;