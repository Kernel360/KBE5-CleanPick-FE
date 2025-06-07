import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '@/manager/layer/HeaderNav';
import ProfileImageUpload from '@/manager/components/profile/ProfileImageUpload';
import BasicInfo from '@/manager/components/profile/BasicInfo';
import ServiceOptions from '@/manager/components/profile/ServiceOptions';
import ActivityAreas from '@/manager/components/profile/ActivityAreas';
import WorkingHours from '@/manager/components/profile/WorkingHours';
import SelfIntroduction from '@/manager/components/profile/SelfIntroduction';
import useAuthStore from '@/stores/useAuthStore';
import instance from '@/common/api/axios';

// 타입 정의
interface ServiceOption {
  id: number;
  name: string;
  checked: boolean;
}

interface ActivityArea {
  address: string;
  detailAddress: string;
  latitude?: number;
  longitude?: number;
}

interface WorkingDay {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface PresignedUrlInfo {
  url: string;
  contentType: string;
}

interface ProfileFormData {
  name: string;
  phone: string;
  services: ServiceOption[];
  activityArea: ActivityArea;
  workingDays: WorkingDay[];
  introduction: string;
  profileImageUrl: string | null;
}

const ProfileForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated, profile, user, fetchProfile, updateUserStatus } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [presignedUrlInfo, setPresignedUrlInfo] = useState<PresignedUrlInfo | null>(null);

  // 폼 상태
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    phone: '',
    services: [
      { id: 1, name: '가정집 청소', checked: false },
      { id: 2, name: '사무실 청소', checked: false },
      { id: 3, name: '에어컨 청소', checked: false },
      { id: 4, name: '후드 청소', checked: false },
      { id: 5, name: '냉장고 청소', checked: false },
    ],
    activityArea: {
      address: '',
      detailAddress: ''
    },
    workingDays: [],
    introduction: '',
    profileImageUrl: null
  });

  // 인증 확인
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // 기존 프로필 데이터가 있으면 폼에 채우기
    if (profile && user?.userStatus === 'ACTIVE') {
      const introduction = 'introduction' in profile && typeof profile.introduction === 'string' 
        ? profile.introduction 
        : '';
      
      setFormData(prev => ({
        ...prev,
        name: profile.name || '',
        phone: profile.phoneNumber || '',
        introduction,
        profileImageUrl: profile.profileImageUrl || null
      }));
    }
  }, [isAuthenticated, profile, navigate, user?.userStatus]);

  // 이미지 선택 핸들러
  const handleImageSelect = (file: File, presignedInfo: PresignedUrlInfo) => {
    setSelectedFile(file);
    setPresignedUrlInfo(presignedInfo);
  };

  // 기본 정보 변경 핸들러
  const handleNameChange = (name: string) => {
    setFormData(prev => ({ ...prev, name }));
  };

  const handlePhoneChange = (phone: string) => {
    setFormData(prev => ({ ...prev, phone }));
  };

  // 서비스 변경 핸들러
  const handleServiceChange = (serviceId: number, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(service =>
        service.id === serviceId ? { ...service, checked } : service
      )
    }));
  };

  // 활동 지역 변경 핸들러
  const handleAreaChange = (area: ActivityArea) => {
    setFormData(prev => ({ ...prev, activityArea: area }));
  };

  // 근무 시간 변경 핸들러
  const handleWorkingDaysChange = (workingDays: WorkingDay[]) => {
    setFormData(prev => ({ ...prev, workingDays }));
  };

  // 자기소개 변경 핸들러
  const handleIntroductionChange = (introduction: string) => {
    setFormData(prev => ({ ...prev, introduction }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // 필수 필드 검증
      if (!formData.name.trim()) {
        alert('이름을 입력해주세요.');
        return;
      }

      if (!formData.phone.trim()) {
        alert('전화번호를 입력해주세요.');
        return;
      }

      const selectedServices = formData.services.filter(service => service.checked);
      if (selectedServices.length === 0) {
        alert('제공 가능한 서비스를 최소 1개 이상 선택해주세요.');
        return;
      }

      if (!formData.activityArea.address.trim()) {
        alert('활동 가능 지역을 입력해주세요.');
        return;
      }

      if (formData.workingDays.length === 0) {
        alert('활동 가능 시간을 최소 1개 이상 추가해주세요.');
        return;
      }

      let profileImageUrl = formData.profileImageUrl;

      // 이미지 업로드
      if (selectedFile && presignedUrlInfo) {
        try {
          const response = await fetch(presignedUrlInfo.url, {
            method: 'PUT',
            body: selectedFile,
            headers: {
              'Content-Type': presignedUrlInfo.contentType,
            },
          });
          
          if (!response.ok) {
            throw new Error(`이미지 업로드 실패 (상태 코드: ${response.status})`);
          }

          profileImageUrl = presignedUrlInfo.url.split('?')[0];
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
          return;
        }
      }

      // API 요청 데이터 준비
      const requestData = {
        name: formData.name,
        phoneNumber: formData.phone,
        mainAddress: formData.activityArea.address,
        subAddress: formData.activityArea.detailAddress,
        profileMessage: formData.introduction,
        profileImageUrl,
        latitude: formData.activityArea.latitude || 0,
        longitude: formData.activityArea.longitude || 0,
        availableCleans: selectedServices.map(s => s.id),
        availableTimes: formData.workingDays.map(workingDay => ({
          dayOfWeek: workingDay.day,
          startTime: workingDay.startTime,
          endTime: workingDay.endTime
        }))
      };
      console.log(requestData)

              // 백엔드에서 status로 오는 경우를 대비한 fallback
        const userStatus = user?.userStatus || (user as any)?.status;
        const method = userStatus === 'PENDING' ? 'post' : 'put';
      const response = await instance[method]('/manager', requestData);

      if (response.data && typeof response.data === 'object' && 'success' in response.data && response.data.success) {
        if (userStatus === 'PENDING') {
          updateUserStatus('ACTIVE');
        }
        await fetchProfile();
        alert('프로필이 성공적으로 저장되었습니다.');
        navigate('/manager/mypage');
      }
    } catch (error) {
      console.error('프로필 저장 실패:', error);
      alert('프로필 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav showBack={true} title="프로필 작성" />
      
      <div className="max-w-md mx-auto p-6 mt-[100px] mb-[50px]">
        <div className="bg-white rounded-lg p-6">
          <div className="space-y-8">
            {/* 프로필 사진 업로드 */}
            <div className="text-center">
              <ProfileImageUpload
                selectedFile={selectedFile}
                onImageSelect={(file, presignedInfo) => {
                  setSelectedFile(file);
                  setPresignedUrlInfo(presignedInfo);
                }}
              />
            </div>

            {/* 구분선 */}
            <div className="border-t border-gray-100"></div>

            {/* 기본 정보 */}
            <BasicInfo
              name={formData.name}
              onNameChange={handleNameChange}
              phone={formData.phone}
              onPhoneChange={handlePhoneChange}
            />

            {/* 구분선 */}
            <div className="border-t border-gray-100"></div>

            {/* 서비스 정보 */}
            <ServiceOptions
              services={formData.services}
              onServiceChange={handleServiceChange}
            />

            {/* 구분선 */}
            <div className="border-t border-gray-100"></div>

            {/* 활동 가능 지역 */}
            <ActivityAreas
              area={formData.activityArea}
              onAreaChange={handleAreaChange}
            />

            {/* 구분선 */}
            <div className="border-t border-gray-100"></div>

            {/* 활동 가능 시간 */}
            <WorkingHours
              workingDays={formData.workingDays}
              onWorkingDaysChange={handleWorkingDaysChange}
            />

            {/* 구분선 */}
            <div className="border-t border-gray-100"></div>

            {/* 자기소개 */}
            <SelfIntroduction
              introduction={formData.introduction}
              onIntroductionChange={handleIntroductionChange}
            />

            {/* 저장 버튼 */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {isLoading ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfileForm };