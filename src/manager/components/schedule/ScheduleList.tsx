import { Schedule } from '@/manager/components/hooks/useScheduleData';
import { FaMapMarkerAlt, FaUser, FaClock, FaWonSign } from 'react-icons/fa';
import { useState } from 'react';
import RequestDetailModal from '../FindRequest/RequestDetailModal';

interface ScheduleListProps {
  schedules: Schedule[];
  date?: Date;
}

export const ScheduleList = ({ schedules }: ScheduleListProps) => {
  const [selected, setSelected] = useState<Schedule | null>(null);
  return (
    <div>
      {schedules.length === 0 ? (
        <p className="text-center text-gray-400 mt-8">일정 없음</p>
      ) : (
        <div className="flex flex-col gap-4">
          {schedules.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow rounded-xl p-5 border border-gray-200 mx-6 mt-1 cursor-pointer"
              onClick={() => setSelected(item)}
            >
              <div>
                <h3 className="text-base font-extrabold">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-1 mt-4">
                <FaMapMarkerAlt className="mr-2 text-gray-400" /><span>{item.address}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <FaUser className="mr-2 text-gray-400" />
                <span>고객: {item.customer} (평점 {item.rating}★)</span>
              </div>  
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <FaClock className="mr-2 text-gray-400" />
                <span>소요 시간: {item.income.toLocaleString()}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <FaWonSign className="mr-2 text-gray-400" />
                <span>예상 수입: ₩{item.income.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {selected && (
        <RequestDetailModal
          request={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};