import HeaderNav from '@/layer/NavHeader';
import BottomNav from '@/layer/NavBottom';

const FindRequest = () => {
  return (
    <div className="pt-[3.5rem] pb-14 px-4">
      <HeaderNav title="FindRequest" />
      <main>
        <h1 className="text-xl font-bold">FindRequest 화면</h1>
        <p>FindRequest 들어갑니다.</p>
      </main>
      <BottomNav />
    </div>
  );
};

export default FindRequest;