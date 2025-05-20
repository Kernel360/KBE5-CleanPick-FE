import React from 'react';
import { Header } from '@/components/layout/Header';
import { Banner } from '@/components/home/Banner';
import { ServiceSection } from '@/components/home/ServiceSection';
import { ManagerSection } from '@/components/home/ManagerSection';
import { ReviewSection } from '@/components/home/ReviewSection';
import { BottomNav } from '@/components/layout/BottomNav';

const MainPage = () => {
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
      <BottomNav />
    </div>
  );
} 

export default MainPage;