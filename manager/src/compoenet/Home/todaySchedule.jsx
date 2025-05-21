import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ScheduleCard from '@/compoenet/scheduleCard';
import { useMemo } from 'react';

const TodaySchedule = ({ schedules, handleStatusChange }) => {
  const navigate = useNavigate();

  const firstIncomplete = useMemo(
    () => schedules.find((item) => item.status !== 'completed'),
    [schedules]
  );

  return (
    <div className="px-4 py-6">
      <div
        className="flex items-center justify-between mb-4"
        onClick={() => navigate('/todaylist')}
      >
        <div className="flex items-center gap-4 cursor-pointer">
          <h2 className="text-lg font-semibold text-gray-800">오늘 일정</h2>
          <FaChevronRight className="text-gray-500" size={14} />
        </div>
      </div>

      {firstIncomplete ? (
        <ScheduleCard
          title={firstIncomplete.title}
          time={firstIncomplete.time}
          address={firstIncomplete.address}
          customer={firstIncomplete.customer}
          rating={firstIncomplete.rating}
          status={firstIncomplete.status}
          onStatusChange={() => handleStatusChange(firstIncomplete.id)}
        />
      ) : (
        <div className="text-center text-gray-500 bg-gray-50 rounded-xl py-8 shadow">
          <p className="text-base">오늘 일정이 없습니다 😊</p>
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;
