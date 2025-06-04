import FilterTabs from '@/manager/components/FilterTabs';
import { useState } from 'react';
import { useAcceptedRequests } from '@/manager/components/hooks/useAcceptedRequests';
import AcceptedRequestCard from './AcceptedRequestCard';

const AcceptedRequestSection = () => {
  const [filter, setFilter] = useState('전체');
  const { acceptedRequests, handleToggleStatus } = useAcceptedRequests();

  const filtered = acceptedRequests.filter((r) =>
    filter === '전체' ? true : r.title.includes(filter)
  );

  return (
    <>
      <FilterTabs
        currentFilter={filter}
        setFilter={setFilter}
        filters={['전체', '가정집 청소', '사무실 청소', '특수 청소']}
        title="수락한 요청"
      />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {filtered.length > 0 ? (
          filtered.map((req) => (
            <AcceptedRequestCard
              key={req.id}
              request={req}
              onToggle={handleToggleStatus}
              isCompleted={false}
            />
          ))
        ) : (
          <div className="text-gray-500 text-sm text-center mt-8">
            수락한 요청이 없습니다.
          </div>
        )}
      </div>
    </>
  );
};

export default AcceptedRequestSection;