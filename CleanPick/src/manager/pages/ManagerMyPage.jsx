import HeaderNav from '@/manager/layer/HeaderNav';
import BottomNav from '@/manager/layer/BottomNav';
import ProfileSection from '@/manager/components/MyPage/ProfileSection';
import MyPageMenu from '@/manager/components/MyPage/MyPageMenu';

const ManagerMyPage = () => {
  return (
    <div className="pt-[3.5rem] pb-14 px-4 ">
      <HeaderNav title="마이페이지" />
      <main>
        <ProfileSection/>
        <MyPageMenu />
      </main>
      <BottomNav />
    </div>
  );
};

export default ManagerMyPage;