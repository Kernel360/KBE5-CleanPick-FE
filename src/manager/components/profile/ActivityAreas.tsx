import React from 'react';
import { ScheduleAddress as KakaoAddress } from './KakaoAddress';
import { ScheduleAddressDetail as AddressDetail } from './AddressDetail';

interface ActivityArea {
  address: string;
  detailAddress: string;
  latitude?: number;
  longitude?: number;
}

interface ActivityAreasProps {
  area: ActivityArea;
  onAreaChange: (area: ActivityArea) => void;
}

export default function ActivityAreas({ area, onAreaChange }: ActivityAreasProps) {
  const updateAreaAddress = (address: string, detail?: { address: string; latitude: number; longitude: number }) => {
    onAreaChange({
      ...area,
      address,
      latitude: detail?.latitude,
      longitude: detail?.longitude
    });
  };

  const updateAreaDetailAddress = (detailAddress: string) => {
    onAreaChange({
      ...area,
      detailAddress
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-gray-700">활동 가능 지역</p>

      <div className="space-y-4">
        <KakaoAddress
          location={area.address}
          onLocationChange={(address, detail) => updateAreaAddress(address, detail)}
        />
        <AddressDetail
          mainAddress={area.address}
          detailAddress={area.detailAddress}
          onDetailAddressChange={(detailAddress) => updateAreaDetailAddress(detailAddress)}
        />
      </div>
    </div>
  );
} 