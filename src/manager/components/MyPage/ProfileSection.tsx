import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';

const ProfileSection = () => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();

  return (
    <div
      onClick={() => navigate('/manager/profileDetail')}
      className="cursor-pointer bg-white rounded-xl shadow px-4 py-10 mb-8 transition-colors hover:bg-indigo-50 active:bg-indigo-100 max-w-[25rem] mx-auto py-[2rem]"
    >
      <div className="flex flex-col items-center text-center">
        {profile?.profileImageUrl ? (
          <img
            src={profile.profileImageUrl}
            alt="프로필 이미지"
            className="w-20 h-20 bg-gray-100 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-indigo-600">
            {profile?.name ? profile.name.charAt(0) : '?'}
          </div>
        )}
        <h2 className="mt-3 text-lg font-semibold text-gray-800">
          {profile?.name || '이름 없음'}
        </h2>
        <p className="text-sm text-gray-500">
          {profile?.profileMessage || '프로필 메시지가 없습니다'}
        </p>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
        <div className="text-center">
          <p className="text-base font-bold text-gray-800">0</p>
          <p>평점</p>
        </div>
        <div className="border-l border-gray-300" />
        <div className="text-center">
          <p className="text-base font-bold text-gray-800">0</p>
          <p>완료한 작업</p>
        </div>
        <div className="border-l border-gray-300" />
        <div className="text-center">
          <p className="text-base font-bold text-gray-800">0%</p>
          <p>수락률</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;