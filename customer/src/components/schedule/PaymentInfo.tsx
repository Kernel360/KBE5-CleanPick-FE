import React from 'react';

interface PaymentInfoProps {
  serviceType: string;
  serviceDate: Date;
  serviceTime: string;
  serviceDuration: number;
  serviceAddress: string;
  totalPrice: number;
  extraFee: number;
}

function calculateTime(time: number) {
  const hour = Math.floor(time / 60);
  const minute = Math.floor(time % 60);
  return `${hour} 시간 ${minute} 분`;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({
  serviceType,
  serviceDate,
  serviceTime,
  serviceDuration,
  serviceAddress,
  totalPrice,
  extraFee,
}) => {
  return (
    <div className="p-6 rounded-lg  bg-gray-100"> 
      <h2 className="text-xl font-bold mb-6">예약 상세내역</h2>
      
      {/* 서비스 정보 */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">서비스 유형</span>
          <span>{serviceType}</span>
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
          <span>{serviceAddress}</span>
        </div>
      </div>
      <hr className="border-gray-300"/>
      {/* 가격 정보 */}
      <div className=" p-4 rounded-lg space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">예약금</span>
          <span>₩{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">수수료 or 추가 비용</span>
          <span>₩{extraFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">₩{(totalPrice + extraFee).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}; 