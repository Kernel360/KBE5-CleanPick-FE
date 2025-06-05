import HeaderNav from '@/manager/layer/HeaderNav';

export const Policy: React.FC = () => {
  return (
    <div className="pt-[3.5rem] pb-14 px-4">
      <HeaderNav title="약관 및 정책" showBack={true} />
      <main className="py-4 space-y-2 text-sm text-gray-600">
        <p>• 서비스 이용 약관</p>
        <p>• 개인정보 처리 방침</p>
        <p>• 위치기반서비스 이용약관</p>
      </main>
    </div>
  );
};
