import { useUserProfile } from '@/compoenet/hooks/useUserProfile';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const MyDetail = () => {
  const { profile } = useUserProfile();

  return (
    <div className="max-w-3xl mx-auto">
      {/* 프로필 섹션 */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600 overflow-hidden">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="프로필 사진"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{profile.name?.[0] || '👤'}</span>
          )}
        </div>

        <div>
          <div className="text-lg font-semibold text-gray-900">{profile.name}</div>
          <div className="flex items-center text-sm text-gray-600 gap-1 mt-1">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold">4.8</span>
            <span className="text-xs text-gray-500">(32)</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <FaMapMarkerAlt className="text-gray-500" />
            <span>{profile.regions.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* 서비스 가능 시간 */}
      <div className="bg-white border rounded-xl py-2 px-4 mt-6 text-sm text-gray-800">
        <div className="text-gray-500 text-sm mb-1">서비스 가능 시간</div>
        <div>
          {profile.availableTime
            .map((slot) =>
              slot.day.includes('OFF')
                ? `${slot.day}`
                : `${slot.day} ${slot.time}`
            )
            .join(', ')}
        </div>
      </div>

      {/* 매니저 소개 */}
      <div className="mt-8">
        <h3 className="font-bold text-gray-800 text-base mb-2">매니저 소개</h3>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {profile.bio || '자기소개가 없습니다.'}
        </p>
      </div>

      {/* 제공 서비스 */}
      <div className="mt-8">
        <h3 className="font-bold text-gray-800 text-base mb-2">제공 서비스</h3>
        <ul>
          {profile.services.map((service, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-green-500">✔</span> {service}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyDetail;