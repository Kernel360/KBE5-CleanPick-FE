import FilterTabs from '@/manager/components/FilterTabs';
import { useNewRequests } from '@/manager/components/hooks/useNewRequests';
import { useState } from 'react';
import RequestCard from './RequestCard';

const NewRequestSection = () => {
  const [filter, setFilter] = useState('전체');
  const { requests, handleApply } = useNewRequests();

  const filtered = requests.filter((item) => {
    const isWaiting = item.status === '대기전';
    if (!isWaiting) return false;

    switch (filter) {
      case '전체':
        return true;
      case '직접요청':
        return item.matchType === '1:1';
      case '랜덤매칭(정기)':
        return item.matchType === '신규' && item.isRecurring === true;
      case '랜덤매칭(1회)':
        return item.matchType === '신규' && item.isRecurring === false;
      default:
        return false;
    }
  });

  return (
    <div>
      <FilterTabs
        currentFilter={filter}
        setFilter={setFilter}
        filters={['전체', '직접요청', '랜덤매칭(정기)', '랜덤매칭(1회)']}
        title="신규 요청"
      />

      <div className="px-4 pt-4 flex flex-col gap-4">
        {filtered.length > 0 ? (
          filtered.map((req) => (
            <RequestCard key={req.id} request={req} onApply={handleApply} />
          ))
        ) : (
          <div className="text-gray-500 text-sm text-center mt-8">
            표시할 요청이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default NewRequestSection;