import HeaderNav from '@/layer/NavHeader';
import BottomNav from '@/layer/NavBottom';

const Schedule = () => {
  return (
    <div className="pt-[3.5rem] pb-14 px-4">
      <HeaderNav title="Schedule" />
      <main>
        <h1 className="text-xl font-bold">Schedule 화면</h1>
        <p>Schedule 들어갑니다.</p>
      </main>
      <BottomNav />
    </div>
  );
};

export default Schedule;