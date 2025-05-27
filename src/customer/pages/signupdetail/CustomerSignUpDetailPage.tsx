import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '@/manager/layer/HeaderNav';
import ProfileImageUpload from '@/customer/components/signup/ProfileImageUpload';
import UserInfoForm from '@/customer/components/signup/UserInfoForm';
import AddressSearch from '@/customer/components/signup/AddressSearch';
import instance from '@/common/api/axios';

interface UserDetailInfo {
  name: string;
  phone: string;
  address: string;
  profileImage: File | null;
}

export default function CustomerSignUpDetailPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserDetailInfo>({
    name: '',
    phone: '',
    address: '',
    profileImage: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('name', userInfo.name);
      formData.append('phone', userInfo.phone);
      formData.append('address', userInfo.address);
      if (userInfo.profileImage) {
        formData.append('profileImage', userInfo.profileImage);
      }

      await instance.post('/customer/signup-detail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/');
    } catch (error) {
      console.error('추가 정보 등록 실패:', error);
      alert('추가 정보 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-[100px]">
      <HeaderNav showBack={true} title="추가 정보 입력" />
      <div className="max-w-md mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProfileImageUpload
            onImageSelect={(file) => setUserInfo(prev => ({ ...prev, profileImage: file }))}
          />
          <UserInfoForm
            userInfo={userInfo}
            onChange={(field, value) => setUserInfo(prev => ({ ...prev, [field]: value }))}
          />
          <AddressSearch
            onAddressSelect={(address) => setUserInfo(prev => ({ ...prev, address }))}
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