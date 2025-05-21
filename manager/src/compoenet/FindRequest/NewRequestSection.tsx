import FilterTabs from '@/compoenet/FilterTabs';
import { useNewRequests } from '@/compoenet/hooks/useNewRequests';
import { useState } from 'react';
import RequestCard from './RequestCard';

const NewRequestSection = () => {
  const [filter, setFilter] = useState('전체');
  const { requests, handleApply } = useNewRequests();

  const filtered = requests.filter((item: any) =>
    filter === '전체' ? true : item.matchType === filter
  );

  const getCardColor = (request: any) => {
    if (request.matchType === '1:1') return 'bg-orange-400';
    if (request.matchType === '신규' && request.isRecurring)
      return 'bg-green-500';
    return 'bg-gray-100';
  };

  return (
    <div>
      <FilterTabs
        currentFilter={filter}
        setFilter={setFilter}
        filters={['전체', '1:1', '신규']}
        title="신규 요청"
        showBack={true}
      />

      <div className="px-4 pt-4 flex flex-col gap-4">
        {filtered.map((req: any) => (
          <RequestCard key={req.id} request={req} onApply={handleApply} />
        ))}

      </div>
    </div>
  );
};

export default NewRequestSection;