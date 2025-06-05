import { useUserProfile } from '@/manager/components/hooks/useUserProfile';
import HeaderNav from '@/manager/layer/HeaderNav';
import { useState } from 'react';
const availableServices = ['가정집 청소', '사무실 청소', '특수 청소'];
const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

export const ProfileForm: React.FC = () => {
  const {
    profile,
    updateProfile,
    addRegion,
    updateRegion,
    addAvailableDay,
    updateAvailableDay,
  } = useUserProfile();

  const [photo, setPhoto] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string | null>(null);

  const handleServiceChange = (service: string) => {
    const exists = profile.services.includes(service);
    updateProfile({
      services: exists
        ? profile.services.filter((s) => s !== service)
        : [...profile.services, service],
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="space-y-6 py-[4rem] px-[2rem]">
      <HeaderNav title="프로필 수정" customBackPath="/manager/mypage" />
      {/* 프로필 사진 */}
      <section className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden text-3xl text-gray-500">
          {photo ? (
            <img src={photo} alt="프로필 사진" className="w-full h-full object-cover" />
          ) : (
            <span>👤</span>
          )}
        </div>
        <label className="mt-2 text-indigo-600 text-sm cursor-pointer">
          + 사진 업로드
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </label>
      </section>

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
        <div className="flex gap-2 mb-4">
          {weekDays.map((day) => (
            <button
              key={day}
              type="button"
              className={`px-3 py-1 rounded-full border text-sm font-medium transition
                ${activeDay === day ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setActiveDay(activeDay === day ? null : day)}
            >
              {day}
            </button>
          ))}
        </div>
        {activeDay && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium w-12">{activeDay}</span>
            <input
              type="time"
              min="00:00"
              max="23:59"
              step="1800"
              value={profile.availableTime.find((slot) => slot.day === activeDay)?.start || ''}
              onChange={(e) => {
                const exists = profile.availableTime.find((slot) => slot.day === activeDay);
                if (exists) {
                  updateAvailableDay(profile.availableTime.findIndex((slot) => slot.day === activeDay), { ...exists, start: e.target.value });
                } else {
                  addAvailableDay();
                  updateAvailableDay(profile.availableTime.length, { day: activeDay, start: e.target.value, end: '' });
                }
              }}
              className="border rounded px-2 py-1 w-[90px] text-sm"
              placeholder="시작"
            />
            <span className="mx-1">~</span>
            <input
              type="time"
              min="00:00"
              max="23:59"
              step="1800"
              value={profile.availableTime.find((slot) => slot.day === activeDay)?.end || ''}
              onChange={(e) => {
                const exists = profile.availableTime.find((slot) => slot.day === activeDay);
                if (exists) {
                  updateAvailableDay(profile.availableTime.findIndex((slot) => slot.day === activeDay), { ...exists, end: e.target.value });
                } else {
                  addAvailableDay();
                  updateAvailableDay(profile.availableTime.length, { day: activeDay, start: '', end: e.target.value });
                }
              }}
              className="border rounded px-2 py-1 w-[90px] text-sm"
              placeholder="종료"
            />
          </div>
        )}
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