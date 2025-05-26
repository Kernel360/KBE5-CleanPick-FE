import HeaderNav from '@/layer/NavHeader';
import MyDetailPage from '@/compoenet/MyPage/MyDetail';
import MyReview from '@/compoenet/MyPage/MyReview';

const ProfileDetail = () => {
  return (
    <div className="pt-[3.5rem] px-4 pb-14">
      <HeaderNav title="내 상세 정보" showBack={true} />
      <main className="mt-6 text-gray-800">
        <div className="max-w-3xl mx-auto space-y-12">
          <MyDetailPage />
          <MyReview />
        </div>
      </main>
    </div>
  );
};

export default ProfileDetail;