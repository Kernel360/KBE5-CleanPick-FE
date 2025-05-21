import HeaderNav from '@/layer/NavHeader';
import BottomNav from '@/layer/NavBottom';
import Income from '@/compoenet/Home/income';
import TodaySchedule from '@/compoenet/Home/todaySchedule';
import { useSchedule } from '@/compoenet/hooks/useSchedule';

const Home = () => {
  const { schedules, handleStatusChange } = useSchedule();

  return (
    <div className="pt-[3.5rem] pb-14 px-4">
      <HeaderNav title="홈" />
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

export default Home;