import { useState } from 'react';
import FilterTabs from '../FilterTabs';
import { useAcceptedRequests } from '../hooks/useAcceptedRequests';
import AcceptedRequestCard from './AcceptedRequestCard';
import SortToggleButton from '../SortToggleButton';

const CompletedRequestSection = () => {
  const [filter, setFilter] = useState('전체');
  const [sortOrder, setSortOrder] = useState<'recent' | 'oldest'>('recent');
  const { completedRequests, markReviewAsWritten } = useAcceptedRequests();

  const parseDate = (dateStr: string): Date => {
    const match = dateStr.match(/(\d+)월 (\d+)일/);
    if (!match) return new Date();
    const [, month, day] = match;
    return new Date(`2025-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
  };

  const filtered = completedRequests
    .filter((r) => filter === '전체' || r.title === filter)
    .sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return sortOrder === 'recent'
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

  return (
    <>
      <FilterTabs
        currentFilter={filter}
        setFilter={setFilter}
        filters={['전체', '가정집 청소', '사무실 청소', '특수 청소']}
        title="완료된 요청"
      />

      <div className="px-4 pt-4 flex flex-col gap-4">
        {filtered.length > 0 ? (
          filtered.map((req) => (
            <AcceptedRequestCard
              key={req.id}
              request={req}
              onToggle={() => {}}
              isCompleted
              onUpdate={() => markReviewAsWritten(req.id)} // ✅ 리뷰 작성 후 업데이트
            />
          ))
        ) : (
          <div className="text-gray-500 text-sm text-center mt-8">완료된 요청이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default CompletedRequestSection;