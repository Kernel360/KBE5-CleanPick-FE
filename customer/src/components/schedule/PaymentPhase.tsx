import React, { useState } from 'react';
import { PaymentMethod } from './PaymentMethod';
import { PaymentInfo } from './PaymentInfo';

interface PaymentPhaseProps {
  totalPrice: number;
  extraFee: number;
  serviceDate: Date;
  serviceTime: string;
  serviceAddress: string;
  serviceDuration: number;
}

export const PaymentPhase: React.FC<PaymentPhaseProps> = ({
  totalPrice,
  extraFee,
  serviceDate,
  serviceTime,
  serviceAddress,
  serviceDuration
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <div className="p-4">
      <PaymentInfo
        serviceType="가정집 청소"
        serviceDate={serviceDate}
        serviceTime={serviceTime}
        serviceDuration={serviceDuration}
        serviceAddress={serviceAddress}
        totalPrice={totalPrice}
        extraFee={extraFee}
      />

      <PaymentMethod
        paymentMethod={paymentMethod}
        onMethodChange={setPaymentMethod}
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