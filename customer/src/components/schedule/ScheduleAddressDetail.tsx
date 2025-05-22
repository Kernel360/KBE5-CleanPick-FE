import React from 'react';
import { MapPin } from 'lucide-react';

interface ScheduleAddressDetailProps {
  detailAddress: string;
  onDetailAddressChange: (detail: string) => void;
  mainAddress: string;
}

export const ScheduleAddressDetail = ({
  detailAddress,
  onDetailAddressChange,
  mainAddress,
}: ScheduleAddressDetailProps) => {
  if (!mainAddress) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">상세 주소 입력</h3>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={detailAddress}
          onChange={(e) => onDetailAddressChange(e.target.value)}
          placeholder="상세 주소를 입력해주세요"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        예시: 102동 1503호, 상가 2층, 주차장 입구 등
      </p>
    </div>
  );
}; 