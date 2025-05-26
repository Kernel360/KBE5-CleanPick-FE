import HeaderNav from '@/layer/NavHeader';
import BottomNav from '@/layer/NavBottom';
import Calendar from '@/compoenet/schedule/Calendar';
import ScheduleList from '@/compoenet/schedule/ScheduleList';
import { useScheduleData } from '@/compoenet/hooks/useScheduleData';

const Schedule = () => {
  const {
    selectedDate,
    setSelectedDate,
    allSchedules,
    schedulesForDate,
  } = useScheduleData();

  return (
    <div className="pt-[3.5rem] pb-14 h-screen flex flex-col overflow-hidden">
      <HeaderNav title="일정" />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          allSchedules={allSchedules}
        />
        <div className="flex-1 overflow-y-auto">
          <ScheduleList date={selectedDate} schedules={schedulesForDate} />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Schedule;