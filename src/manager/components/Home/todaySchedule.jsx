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
        <div 
          className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => navigate('/manager/findrequest')}
        >
          <p className="text-gray-600 mb-2">오늘 일정이 없습니다!</p>
          <p className="text-indigo-600 font-medium">새로운 요청을 신청해보세요</p>
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;
