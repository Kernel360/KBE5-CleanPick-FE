import HeaderNav from '@/layer/NavHeader';
import BottomNav from '@/layer/NavBottom';
import Income from '@/compoenet/Home/income';
import TodaySchedule from '@/compoenet/Home/todaySchedule';

const Home = () => {
  return (
    <div className="pt-[3.5rem] pb-14 px-4">
      <HeaderNav title="홈" />
      <main>
        <Income />
        <TodaySchedule />
      </main>
      <BottomNav />
    </div>
  );
};

export default Home;