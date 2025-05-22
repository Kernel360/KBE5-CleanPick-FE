import { useUserProfile } from '@/compoenet/hooks/useUserProfile';

const availableServices = ['가정집 청소', '사무실 청소', '특수 청소'];

const ProfileForm = () => {
  const {
    profile,
    updateProfile,
    addRegion,
    updateRegion,
    addAvailableDay,
    updateAvailableDay,
  } = useUserProfile();

  const handleServiceChange = (service: string) => {
    const exists = profile.services.includes(service);
    updateProfile({
      services: exists
        ? profile.services.filter((s) => s !== service)
        : [...profile.services, service],
    });
  };

  return (
    <form className="space-y-6 p-[2rem]">
      {/* 기본 정보 */}
      <section>
        <h3 className="font-bold text-gray-800 mb-2">기본 정보</h3>
        <label className="block text-sm font-semibold">이름</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => updateProfile({ name: e.target.value })}
          className="w-full mt-1 px-3 py-2 border rounded"
        />
        <label className="block mt-4 text-sm font-semibold">전화번호</label>
        <input
          type="text"
          placeholder="전화번호를 입력하세요"
          value={profile.phone}
          onChange={(e) => updateProfile({ phone: e.target.value })}
          className="w-full mt-1 px-3 py-2 border rounded"
        />
      </section>

      {/* 서비스 정보 */}
      <section>
        <h3 className="font-bold text-gray-800 mb-2">서비스 정보</h3>
        <p className="text-sm text-gray-500 mb-2">제공 가능한 서비스 (다중 선택 가능)</p>
        <div className="flex flex-col gap-2">
          {availableServices.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={profile.services.includes(s)}
                onChange={() => handleServiceChange(s)}
              />
              {s}
            </label>
          ))}
        </div>
      </section>

      {/* 활동 가능 지역 */}
      <section>
        <h3 className="font-bold text-gray-800 mb-2">활동 가능 지역</h3>
        <div className="space-y-2">
          {profile.regions.map((region, idx) => (
            <input
              key={idx}
              type="text"
              value={region}
              onChange={(e) => updateRegion(idx, e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          ))}
        </div>
        <button
          type="button"
          className="text-indigo-600 text-sm mt-2"
          onClick={addRegion}
        >
          + 지역 추가
        </button>
      </section>

      {/* 활동 가능 시간 */}
      <section>
        <h3 className="font-bold text-gray-800 mb-2">활동 가능 시간</h3>
        {profile.availableTime.map((slot, i) => (
          <div key={i} className="flex justify-between items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="요일 (예: 수요일)"
              value={slot.day}
              onChange={(e) =>
                updateAvailableDay(i, { ...slot, day: e.target.value })
              }
              className="border rounded px-2 py-1 w-[40%] text-sm"
            />
            <input
              type="text"
              value={slot.time}
              onChange={(e) =>
                updateAvailableDay(i, { ...slot, time: e.target.value })
              }
              className="border rounded px-2 py-1 w-[50%] text-sm"
            />
          </div>
        ))}
        <button
          type="button"
          className="text-indigo-600 text-sm"
          onClick={addAvailableDay}
        >
          + 요일 추가
        </button>
      </section>

      {/* 자기소개 */}
      <section>
        <h3 className="font-bold text-gray-800 mb-2">자기소개 (선택사항)</h3>
        <textarea
          value={profile.bio}
          onChange={(e) => updateProfile({ bio: e.target.value })}
          placeholder="자신을 소개하는 글을 작성해주세요"
          className="w-full border px-3 py-2 rounded"
        />
      </section>

      {/* 저장 버튼 */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 font-semibold rounded"
      >
        저장하기
      </button>
    </form>
  );
};

export default ProfileForm;