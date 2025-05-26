import React from 'react';
import { CleaningOption } from '@/customer/pages/schedule/SchedulePage';

interface PaymentInfoProps {
  serviceType: string;
  serviceDate: Date;
  serviceTime: string;
  serviceDuration: number;
  serviceAddress: string;
  serviceAddressDetail: string;
  totalPrice: number;
  selectedOptions: CleaningOption[];
}

function calculateTime(time: number) {
  const hour = Math.floor(time / 60);
  const minute = Math.floor(time % 60);
  return `${hour} 시간 ${minute} 분`;
}

function convertServiceType(serviceType: string) {
  if (serviceType === 'HOME') {
    return '가정집 청소';
  } else if (serviceType === 'OFFICE') {
    return '사무실 청소';
  } else if (serviceType === 'SPECIAL') {
    return '특수 청소';
  }
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({
  serviceType,
  serviceDate,
  serviceTime,
  serviceDuration,
  serviceAddress,
  serviceAddressDetail,
  totalPrice,
  selectedOptions = []
}) => {
  return (
    <div className="p-6 rounded-lg bg-gray-100"> 
      <h2 className="text-xl font-bold mb-6">예약 상세내역</h2>
      
      {/* 서비스 정보 */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">서비스 유형</span>
          <span>{convertServiceType(serviceType)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">예약 날짜</span>
          <span>
            {serviceDate.toISOString().split('T')[0]}, {serviceTime}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">서비스 기간</span>
          <span>{calculateTime(serviceDuration)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">위치</span>
          <div className="text-right">
            <div>{serviceAddress}</div>
            <div className="text-md text-gray-500">{serviceAddressDetail}</div>
          </div>
        </div>
      </div>
     
      {/* 가격 정보 */}
      <div className="p-4 rounded-lg space-y-3 mb-">
        
        
        {/* 선택된 옵션들 */}
        {selectedOptions.map((option) => (
          <div key={option.id} className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{option.label}</span>
            <span>₩{option.extra_price.toLocaleString()}</span>
          </div>
        ))}

        {/* 총액 */}
        <div className="flex justify-between items-center font-bold text-lg pt-2 border-t border-gray-300 ">
          <span>Total</span>
          <span className="text-primary">₩{(totalPrice).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}; 