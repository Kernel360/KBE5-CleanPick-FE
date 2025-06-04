import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/customer/components/layout/Header';
import ProfileImageUpload from '@/customer/components/signup/ProfileImageUpload';
import UserInfoForm from '@/customer/components/signup/UserInfoForm';
import { ScheduleAddress } from '@/customer/components/schedule/ScheduleAddress';
import { ScheduleAddressDetail } from '@/customer/components/schedule/ScheduleAddressDetail';
import instance from '@/common/api/axios';

interface UserDetailInfo {
  name: string;
  phoneNumber: string;
  mainAddress: string;
  subAddress: string;
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
    mainAddress: '',
    subAddress: ''
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
        mainAddress: userInfo.mainAddress,
        subAddress: userInfo.subAddress,
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

  const handleLocationChange = (location: string) => {
    setUserInfo(prev => ({
      ...prev,
      mainAddress: location
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showBack={true} title="추가 정보 입력" />
      <div className="max-w-md mx-auto p-6 mt-[100px]">
        <form onSubmit={handleSubmit} className="space-y-6">
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
            location={userInfo.mainAddress}
            onLocationChange={handleLocationChange}
          />
          <ScheduleAddressDetail
            detailAddress={userInfo.subAddress}
            onDetailAddressChange={(detail) => setUserInfo(prev => ({ ...prev, subAddress: detail }))}
            mainAddress={userInfo.mainAddress}
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold"
          >
            등록 완료
          </button>
        </form>
      </div>
    </div>
  );
} 