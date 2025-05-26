import React from 'react';
import { Header } from '@/customer/components/layout/Header';
import { Banner } from '@/customer/components/home/Banner';
import { ServiceSection } from '@/customer/components/home/ServiceSection';
import { ManagerSection } from '@/customer/components/home/ManagerSection';
import { ReviewSection } from '@/customer/components/home/ReviewSection';


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
    </div>
  );
} 

export default MainPage;