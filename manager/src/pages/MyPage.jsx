import HeaderNav from '@/layer/NavHeader';
import BottomNav from '@/layer/NavBottom';
import ProfileSection from '@/compoenet/MyPage/ProfileSection';
import MyPageMenu from '@/compoenet/MyPage/MyPageMenu';

const MyPage = () => {
  return (
    <div className="pt-[3.5rem] pb-14 px-4">
      <HeaderNav title="마이페이지" />
      <main>
        <ProfileSection />
        <MyPageMenu />
      </main>
      <BottomNav />
    </div>
  );
};

export default MyPage;