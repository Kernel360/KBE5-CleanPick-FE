import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/customer/components/layout/Header';
import ProfileImageUpload from '@/customer/components/signup/ProfileImageUpload';
import UserInfoForm from '@/customer/components/signup/UserInfoForm';
import { ScheduleAddress } from '@/customer/components/schedule/ScheduleAddress';
import { ScheduleAddressDetail } from '@/customer/components/schedule/ScheduleAddressDetail';
import instance from '@/common/api/axios';

interface AddressInfo {
  mainAddress: string;
  subAddress: string;
  latitude: number;
  longitude: number;
}

interface UserDetailInfo {
  name: string;
  phoneNumber: string;
  addressInfo: AddressInfo;
}

interface PresignedUrlInfo {
  url: string;
  contentType: string;
}

export default function CustomerSignUpDetailPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserDetailInfo>({
    name: '',
    phoneNumber: '',
    addressInfo: {
      mainAddress: '',
      subAddress: '',
      latitude: 0,
      longitude: 0
    }
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [presignedUrlInfo, setPresignedUrlInfo] = useState<PresignedUrlInfo | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let profileImageUrl = '';
      
      // 이미지가 있는 경우 먼저 S3에 업로드
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

          // presigned URL에서 쿼리 파라미터를 제거하여 실제 S3 URL 추출
          profileImageUrl = presignedUrlInfo.url.split('?')[0];
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
          return;
        }
      }

      // 회원 정보 등록
      const signupData = {
        name: userInfo.name,
        phoneNumber: userInfo.phoneNumber,
        mainAddress: userInfo.addressInfo.mainAddress,
        subAddress: userInfo.addressInfo.subAddress,
        latitude: userInfo.addressInfo.latitude,
        longitude: userInfo.addressInfo.longitude,
        profileImageUrl
      };

      await instance.post('/customers', signupData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigate('/');
    } catch (error) {
      console.error('추가 정보 등록 실패:', error);
      alert('추가 정보 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleLocationChange = (location: string, detail?: { address: string; latitude: number; longitude: number }) => {
    setUserInfo(prev => ({
      ...prev,
      addressInfo: {
        ...prev.addressInfo,
        mainAddress: location,
        // detail이 있을 경우 위도/경도 업데이트
        ...(detail && {
          latitude: detail.latitude,
          longitude: detail.longitude
        })
      }
    }));
  };

  const handleDetailAddressChange = (detail: string) => {
    setUserInfo(prev => ({
      ...prev,
      addressInfo: {
        ...prev.addressInfo,
        subAddress: detail
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showBack={true} title="추가 정보 입력" />
      <div className="max-w-md mx-auto p-6 mt-[100px] mb-[50px]">
        <div className="space-y-6">
          <ProfileImageUpload
            selectedFile={selectedFile}
            onImageSelect={(file, presignedInfo) => {
              setSelectedFile(file);
              setPresignedUrlInfo(presignedInfo);
            }}
          />
          <UserInfoForm
            userInfo={userInfo}
            onChange={(field, value) => setUserInfo(prev => ({ ...prev, [field]: value }))}
          />
          <ScheduleAddress
            location={userInfo.addressInfo.mainAddress}
            onLocationChange={handleLocationChange}
          />
          <ScheduleAddressDetail
            detailAddress={userInfo.addressInfo.subAddress}
            onDetailAddressChange={handleDetailAddressChange}
            mainAddress={userInfo.addressInfo.mainAddress}
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold"
            onClick={handleSubmit}
         >
            등록 완료
          </button>
        </div>
      </div>
    </div>
  );
} 