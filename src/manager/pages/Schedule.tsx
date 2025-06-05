import HeaderNav from '@/manager/layer/HeaderNav';
import BottomNav from '@/manager/layer/BottomNav';
import Calendar from '@/manager/components/schedule/Calendar';
import { ScheduleList } from '@/manager/components/schedule/ScheduleList';
import { useScheduleData } from '@/manager/components/hooks/useScheduleData';

export const Schedule: React.FC = () => {
  const {
    selectedDate,
    setSelectedDate,
    allSchedules,
    schedulesForDate,
  } = useScheduleData();

  return (
    <div className="pt-[3.5rem] pb-14 h-screen flex flex-col overflow-hidden">
      <HeaderNav title="일정" />

      <main className="flex-1 flex flex-col overflow-hidden mt-4">
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          allSchedules={allSchedules}
        />
        <div className="flex-1 overflow-y-auto mt-6">
          <ScheduleList schedules={schedulesForDate} />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}; 