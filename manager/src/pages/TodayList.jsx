import HeaderNav from '@/layer/NavHeader';
import BottomNav from '@/layer/NavBottom';

const TodayList = () => {
  return (
    <div className="pt-[3.5rem] pb-14 px-4">
      <HeaderNav title="오늘 일정" showBack={true}/>
      <main>
        <h1 className="text-xl font-bold">오늘 일정</h1>
        <p>TodayList 들어갑니다.</p>
      </main>
      <BottomNav />
    </div>
  );
};

export default TodayList;