import React, { useState } from 'react';
import { PaymentMethod } from './PaymentMethod';
import { PaymentInfo } from './PaymentInfo';
import { CleaningOption } from '@/customer/pages/schedule/SchedulePage';

interface AddressInfo {
  mainAddress: string;
  subAddress: string;
  latitude: number;
  longitude: number;
}

interface PaymentPhaseProps {
  totalPrice: number;
  selectedOptions: CleaningOption[];
  serviceDate: Date;
  serviceTime: string;
  addressInfo: AddressInfo;
  serviceDuration: number;
  selectedServiceType: string;
  paymentMethod: 'cash' | 'card';
  onPaymentMethodChange: (method: 'cash' | 'card') => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PaymentPhase: React.FC<PaymentPhaseProps> = ({
  selectedServiceType,
  selectedOptions,
  totalPrice,
  serviceDate,
  serviceTime,
  addressInfo,
  serviceDuration,
  paymentMethod,
  onPaymentMethodChange,
  onNext,
  onPrev,
}) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const confirmSchedule = () => {
    console.log("selectedServiceType", selectedServiceType)
    console.log("selectedOptions", selectedOptions)
    console.log("totalPrice", totalPrice)
    console.log("serviceDate", serviceDate)
    console.log("serviceTime", serviceTime)
    console.log("addressInfo", addressInfo)
    console.log("serviceDuration", serviceDuration)
  }

  return (
    <div className="p-4">
      <PaymentInfo
        selectedOptions={selectedOptions}
        serviceType={selectedServiceType}
        serviceDate={serviceDate}
        serviceTime={serviceTime}
        serviceDuration={serviceDuration}
        addressInfo={addressInfo}
        totalPrice={totalPrice || 0}
      />

      {/* 약관 동의 */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="terms"
          checked={isAgreed}
          onChange={(e) => setIsAgreed(e.target.checked)}
          className="w-4 h-4 rounded border-radius-sm border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          이용약관 및 개인정보 수집 및 이용에 동의합니다.
        </label>
      </div>

  
      <button
        disabled={!isAgreed}
        onClick={confirmSchedule}
        className={`w-full py-4 rounded-lg font-medium text-white ${
          isAgreed ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300'
        }`}
      >
        예약완료
      </button>

    </div>
  );
}; 