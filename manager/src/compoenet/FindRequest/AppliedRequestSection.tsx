import FilterTabs from '@/compoenet/FilterTabs';
import { useState } from 'react';
import { useNewRequests } from '@/compoenet/hooks/useNewRequests';
import RequestCard from './RequestCard';

const AppliedRequestSection = () => {
  const [filter, setFilter] = useState('전체');
  const { appliedRequests } = useNewRequests();

  const filtered = appliedRequests.filter((item) =>
    filter === '전체' ? true : item.title.includes(filter)
  );

  return (
    <>
      <FilterTabs
        currentFilter={filter}
        setFilter={setFilter}
        filters={['전체', '가정집 청소', '사무실 청소']}
        title="신청 요청"
        showBack={true}
      />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {filtered.length > 0 ? (
          filtered.map((req) => (
            <RequestCard key={req.id} request={req} onApply={() => {}} />
          ))
        ) : (
          <div className="text-gray-500 text-sm text-center mt-8">신청한 요청이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default AppliedRequestSection;