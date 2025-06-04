import HeaderNav from '@/manager/layer/HeaderNav';
import BottomNav from '@/manager/layer/BottomNav';
import RequestTabs from '@/manager/components/RequestTabsProps';
import { useState } from 'react';
import NewRequestSection from '@/manager/components/FindRequest/NewRequestSection';
import AppliedRequestSection from '@/manager/components/FindRequest/AppliedRequestSection';
import AcceptedRequestSection from '@/manager/components/FindRequest/AcceptedRequestSection';
import CompletedRequestSection from '@/manager/components/FindRequest/CompletedRequestSection';

const FindRequest = () => {
  const [activeTab, setActiveTab] = useState('신규 요청');

  const renderContent = () => {
    switch (activeTab) {
      case '신규 요청':
        return <NewRequestSection  Section />;
      case '신청한 요청':
        return <AppliedRequestSection />;
      case '수락된 요청':
        return <AcceptedRequestSection />;
      case '완료된 요청':
        return <CompletedRequestSection />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-[3.5rem] pb-14 px-4">
      <HeaderNav title="요청" />
      <main>
        <RequestTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={['신규 요청', '신청한 요청', '수락된 요청', '완료된 요청']}
        />
        {renderContent()}
      </main>
      <BottomNav />
    </div>
  );
};

export default FindRequest;