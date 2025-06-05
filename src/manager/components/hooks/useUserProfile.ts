import { useState } from 'react';

export interface UserProfile {
  name: string;
  phone: string;
  services: string[];
  regions: string[];
  availableTime: { day: string; start: string; end: string }[];
  bio?: string;
  photo?: string;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '홍길동',
    phone: '',
    services: ['가정집 청소'],
    regions: ['비엔티안 시내'],
    availableTime: [
      { day: '월요일', start: '09:00', end: '18:00' },
      { day: '화요일', start: '09:00', end: '18:00' },
    ],
    bio: '안녕하세요. 홍길동입니다. 청소 서비스를 제공합니다.',
    photo: '',
  });

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const addRegion = () => {
    setProfile((prev) => ({
      ...prev,
      regions: [...prev.regions, ''],
    }));
  };

  const updateRegion = (index: number, value: string) => {
    const updated = [...profile.regions];
    updated[index] = value;
    setProfile((prev) => ({ ...prev, regions: updated }));
  };

  const addAvailableDay = () => {
    setProfile((prev) => ({
      ...prev,
      availableTime: [...prev.availableTime, { day: '', start: '', end: '' }],
    }));
  };

  const updateAvailableDay = (index: number, updatedSlot: { day: string; start: string; end: string }) => {
    const updated = [...profile.availableTime];
    updated[index] = updatedSlot;
    setProfile((prev) => ({ ...prev, availableTime: updated }));
  };

  return {
    profile,
    updateProfile,
    addRegion,
    updateRegion,
    addAvailableDay,
    updateAvailableDay,
  };
};