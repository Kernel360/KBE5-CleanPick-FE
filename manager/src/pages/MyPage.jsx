import HeaderNav from '@/layer/NavHeader';
import BottomNav from '@/layer/NavBottom';

const MyPage = () => {
  return (
    <div className="pt-[3.5rem] pb-14 px-4">
      <HeaderNav title="MyPage" />
      <main>
        <h1 className="text-xl font-bold">MyPage 화면</h1>
        <p>MyPage 들어갑니다.</p>
      </main>
      <BottomNav />
    </div>
  );
};

export default MyPage;