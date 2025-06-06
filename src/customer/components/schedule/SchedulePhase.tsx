import React, { useState } from 'react';
import { ScheduleCalender } from './ScheduleCalender';
import { ScheduleTime } from './ScheduleTime';
import { ScheduleAddress } from './ScheduleAddress';
import { ScheduleAddressDetail } from './ScheduleAddressDetail';

interface AddressInfo {
  mainAddress: string;
  subAddress: string;
  latitude: number;
  longitude: number;
}

interface SchedulePhaseProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  selectedHour: string;
  selectedMinute: string;
  onHourSelect: (hour: string) => void;
  onMinuteSelect: (minute: string) => void;
  addressInfo: AddressInfo;
  onAddressInfoChange: (addressInfo: AddressInfo) => void;
}

export const SchedulePhase = ({
  selectedDate,
  onDateSelect,
  selectedHour,
  selectedMinute,
  onHourSelect,
  onMinuteSelect,
  addressInfo,
  onAddressInfoChange
}: SchedulePhaseProps) => {
  const [serviceType, setServiceType] = useState<'once' | 'regular'>('once');

  const handleLocationChange = (location: string, detail?: { address: string; latitude: number; longitude: number }) => {
    const updatedAddressInfo = {
      ...addressInfo,
      mainAddress: location,
      ...(detail && {
        latitude: detail.latitude,
        longitude: detail.longitude
      })
    };
    onAddressInfoChange(updatedAddressInfo);
  };

  const handleDetailAddressChange = (detailAddress: string) => {
    const updatedAddressInfo = {
      ...addressInfo,
      subAddress: detailAddress
    };
    onAddressInfoChange(updatedAddressInfo);
  };

  return (
    <div className="px-4">
      {/* 서비스 타입 선택 */}
      <h2 className="text-lg font-bold mb-4">정기 서비스</h2>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setServiceType('once')}
          className={`flex-1 py-3 rounded-lg font-medium text-center transition-colors
            ${serviceType === 'once' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-500'}`}
        >
          1회성
        </button>
        <button
          onClick={() => setServiceType('regular')}
          className={`flex-1 py-3 rounded-lg font-medium text-center transition-colors
            ${serviceType === 'regular' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-500'}`}
        >
          정기
        </button>
      </div>

      <ScheduleCalender
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
      />
      <ScheduleTime 
        selectedHour={selectedHour}
        selectedMinute={selectedMinute}
        onHourSelect={onHourSelect}
        onMinuteSelect={onMinuteSelect}
      />

      <ScheduleAddress 
        location={addressInfo.mainAddress} 
        onLocationChange={handleLocationChange} 
      />

      <ScheduleAddressDetail
        detailAddress={addressInfo.subAddress}
        onDetailAddressChange={handleDetailAddressChange}
        mainAddress={addressInfo.mainAddress}
      />
    </div>
  );
};
