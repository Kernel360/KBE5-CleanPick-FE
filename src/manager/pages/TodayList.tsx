import { useState } from 'react';
import { useSchedule } from '@/manager/components/hooks/useSchedule';
import FilterTabs from '@/manager/components/FilterTabs';
import ScheduleCard from '@/manager/components/scheduleCard';

interface Schedule {
  id: number;
  category: string;
  title: string;
  time: string;
  address: string;
  customer: string;
  rating: string;
  status: 'ready' | 'checked-in' | 'completed';
}

export const ScheduleList: React.FC = () => {
  const { schedules, handleStatusChange, isLoading, error } = useSchedule();
  const [filter, setFilter] = useState<string>('전체');
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  const filtered = schedules.filter(
    (s) =>
      (filter === '전체' || s.category === filter) &&
      (showCompleted || s.status !== 'completed')
  );

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 mt-20">로딩 중...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-20">불러오기 실패</div>
    );
  }

  return (
    <div className="pt-[3.5rem] pb-14">
      <FilterTabs
        currentFilter={filter}
        setFilter={setFilter}
        filters={['전체', '가정집 청소', '사무실 청소']}
        title="오늘 일정"
        showBack={true}
      />

      <div className="px-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          완료된 일정 보기
        </label>
      </div>

      <div className="px-4">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <ScheduleCard
              key={item.id}
              {...item}
              onStatusChange={() => handleStatusChange(item.id)}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 py-12">
            해당 일정이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}; 