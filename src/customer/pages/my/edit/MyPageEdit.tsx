import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/customer/components/layout/Header';
import { Input } from '@/customer/components/ui/input';
import { Button } from '@/customer/components/ui/button';
import useAuthStore from '@/stores/useAuthStore';
import instance from '@/customer/api/axios';
import { cn } from '@/customer/lib/utils';
import { ScheduleAddress } from '@/customer/components/schedule/ScheduleAddress';
import { ScheduleAddressDetail } from '@/customer/components/schedule/ScheduleAddressDetail';
import ProfileImageUpload from '@/customer/components/signup/ProfileImageUpload';

interface EditProfileForm {
  name: string;
  phoneNumber: string;
  mainAddress: string;
  subAddress: string;
  profileImageUrl: string | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  code: string;
}

interface PresignedUrlInfo {
  url: string;
  contentType: string;
}

interface AddressInfo {
  mainAddress: string;
  subAddress: string;
  latitude: number;
  longitude: number;
  address?: string;  // 카카오 API에서 받는 전체 주소
}

interface KakaoGeocoderResult {
  y: string;  // 위도
  x: string;  // 경도
}

const MyPageEdit = () => {
  const navigate = useNavigate();
  const { isAuthenticated, profile, user, fetchProfile, updateUserStatus } = useAuthStore();
  const [form, setForm] = useState<EditProfileForm>({
    name: '',
    phoneNumber: '',
    mainAddress: '',
    subAddress: '',
    profileImageUrl: null
  });

  // 주소 관련 state를 분리
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    mainAddress: '',
    subAddress: '',
    latitude: 0,
    longitude: 0
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [presignedUrlInfo, setPresignedUrlInfo] = useState<PresignedUrlInfo | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (profile && user?.userStatus === 'ACTIVE') {
      setForm({
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        mainAddress: profile.mainAddress,
        subAddress: profile.subAddress,
        profileImageUrl: profile.profileImageUrl
      });
      // 초기 주소 정보도 설정
      setAddressInfo({
        mainAddress: profile.mainAddress,
        subAddress: profile.subAddress,
        latitude: profile.latitude || 0,
        longitude: profile.longitude || 0,
        address: profile.address || profile.mainAddress
      });
    }
  }, [isAuthenticated, profile, navigate, user?.userStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let profileImageUrl = form.profileImageUrl;

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

      // 위도/경도가 없으면 geocoder로 가져오기
      let latitude = addressInfo.latitude;
      let longitude = addressInfo.longitude;

      if (!latitude || !longitude) {
        const geocoder = new window.kakao.maps.services.Geocoder();
        try {
          const result = await new Promise<KakaoGeocoderResult>((resolve, reject) => {
            geocoder.addressSearch(addressInfo.mainAddress, (result: KakaoGeocoderResult[], status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                resolve(result[0]);
              } else {
                reject(new Error('주소 검색 실패'));
              }
            });
          });
          latitude = Number(result.y);
          longitude = Number(result.x);
        } catch (error) {
          console.error('위도/경도 검색 실패:', error);
          alert('주소의 위도/경도를 가져오는데 실패했습니다. 다시 시도해주세요.');
          setIsLoading(false);
          return;
        }
      }

      const method = user?.userStatus === 'PENDING' ? 'post' : 'put';
      const response = await instance[method]<ApiResponse>('/customers', {
        name: form.name,
        phoneNumber: form.phoneNumber,
        mainAddress: addressInfo.mainAddress,
        subAddress: addressInfo.subAddress,
        address: addressInfo.address,
        latitude,
        longitude,
        profileImageUrl
      });

      if (response.data.success) {
        if (user?.userStatus === 'PENDING') {
          updateUserStatus('ACTIVE');
        }
        await fetchProfile();
        navigate('/mypage');
      }
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationChange = (location: string, detail?: { address: string; latitude: number; longitude: number }) => {
    // form state 대신 addressInfo를 업데이트
    setAddressInfo(prev => ({
      ...prev,
      mainAddress: location,
      // detail이 있을 경우 위도/경도/주소 업데이트
      ...(detail && {
        latitude: detail.latitude,
        longitude: detail.longitude,
        address: detail.address
      })
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={user?.userStatus === 'PENDING' ? "프로필 등록" : "프로필 수정"}
        showBack={true}
      />
      
      <div className="pt-[3.5rem] px-4 pb-[100px] pt-[100px]">
        <div className="space-y-6">
          <ProfileImageUpload
            selectedFile={selectedFile}
            onImageSelect={(file, presignedInfo) => {
              setSelectedFile(file);
              setPresignedUrlInfo(presignedInfo);
            }}
          />

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">닉네임</label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full h-12"
                placeholder="닉네임을 입력하세요"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">전화번호</label>
              <Input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full h-12"
                placeholder="전화번호를 입력하세요"
              />
            </div>

            <ScheduleAddress
              location={addressInfo.mainAddress}
              onLocationChange={handleLocationChange}
            />
            <ScheduleAddressDetail
              detailAddress={addressInfo.subAddress}
              onDetailAddressChange={(detail) => 
                setAddressInfo(prev => ({ ...prev, subAddress: detail }))
              }
              mainAddress={addressInfo.mainAddress}
            />
          </div>

          <Button
            onClick={handleSubmit}
            type="button"
            className={cn(
              "w-full h-12 mt-8",
              "bg-primary text-white",
              "disabled:bg-gray-300"
            )}
            disabled={isLoading}
          >
            {isLoading ? '저장 중...' : (user?.userStatus === 'PENDING' ? '등록하기' : '수정하기')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyPageEdit; 