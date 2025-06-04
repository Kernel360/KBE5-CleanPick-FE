import HeaderNav from '@/manager/layer/HeaderNav';
import BottomNav from '@/manager/layer/BottomNav';
import Income from '@/manager/components/Home/income';
import TodaySchedule from '@/manager/components/Home/todaySchedule';
import { useSchedule } from '@/manager/components/hooks/useSchedule';

export const Home: React.FC = () => {
  const { schedules, handleStatusChange } = useSchedule();

  return (
    <div className="pt-[3.5rem] pb-14 px-4">
      <HeaderNav title="CleanPick" />
      <main>
        <Income />
        <TodaySchedule
          schedules={schedules}
          handleStatusChange={handleStatusChange}
        />
      </main>
      <BottomNav />
    </div>
  );
}; 