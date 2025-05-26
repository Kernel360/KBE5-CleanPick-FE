import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ScheduleCard from '@/manager/components/scheduleCard';
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
        onClick={() => navigate('/manager/todaylist')}
      >
        <div className="flex items-center gap-4 cursor-pointer">
          <h2 className="text-lg font-semibold text-gray-800">오늘 일정</h2>
          <FaChevronRight className="text-gray-500" size={14} />
        </div>
      </div>

      {firstIncomplete ? (
        <ScheduleCard
          schedule={firstIncomplete}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <div className="text-center py-8 text-gray-500">
          오늘 남은 일정이 없습니다
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;
