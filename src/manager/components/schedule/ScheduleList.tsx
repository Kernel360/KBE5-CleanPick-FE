import { Schedule } from '@/manager/components/hooks/useScheduleData';

interface ScheduleListProps {
  schedules: Schedule[];
  date?: Date;
}

export const ScheduleList = ({ schedules }: ScheduleListProps) => {
  return (
    <div>
      {schedules.length === 0 ? (
        <p className="text-center text-gray-400 mt-8">일정 없음</p>
      ) : (
        <div className="flex flex-col gap-4">
          {schedules.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow rounded-xl p-4 border border-gray-200"
            >
              <h3 className="font-bold text-base">{item.title}</h3>
              <p className="text-gray-600">{item.time}</p>
              <p className="mt-2">📍 {item.address}</p>
              <p>👤 고객: {item.customer} ({item.rating}★)</p>
              <p>🌞 예상 수입: ₩{item.income.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};