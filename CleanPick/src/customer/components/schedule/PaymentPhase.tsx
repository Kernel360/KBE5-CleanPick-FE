import React, { useState } from 'react';
import { PaymentMethod } from './PaymentMethod';
import { PaymentInfo } from './PaymentInfo';
import { CleaningOption } from '@/customer/pages/schedule/SchedulePage';

interface PaymentPhaseProps {
  totalPrice: number;
  selectedOptions: CleaningOption[];
  serviceDate: Date;
  serviceTime: string;
  serviceAddress: string;
  serviceAddressDetail: string;
  serviceDuration: number;
  selectedServiceType: string;
  paymentMethod: 'cash' | 'card';
  onPaymentMethodChange: (method: 'cash' | 'card') => void;
}

export const PaymentPhase: React.FC<PaymentPhaseProps> = ({
  selectedServiceType,
  selectedOptions,
  totalPrice,
  serviceDate,
  serviceTime,
  serviceAddress,
  serviceAddressDetail,
  serviceDuration,
  paymentMethod,
  onPaymentMethodChange
}) => {
  const [isAgreed, setIsAgreed] = useState(false);
  return (
    <div className="p-4">
      <PaymentInfo
        selectedOptions={selectedOptions}
        serviceType={selectedServiceType}
        serviceDate={serviceDate}
        serviceTime={serviceTime}
        serviceDuration={serviceDuration}
        serviceAddress={serviceAddress}
        serviceAddressDetail={serviceAddressDetail}
        totalPrice={totalPrice}
      />

      <PaymentMethod
        paymentMethod={paymentMethod}
        onMethodChange={onPaymentMethodChange}
      />

      {/* 약관 동의 */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="terms"
          checked={isAgreed}
          onChange={(e) => setIsAgreed(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to the Terms of Service and Privacy Policy
        </label>
      </div>

      {/* 결제 버튼 */}
      <button
        disabled={!isAgreed}
        className={`w-full py-4 rounded-lg font-medium text-white ${
          isAgreed ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300'
        }`}
      >
        결제하기
      </button>
    </div>
  );
}; 