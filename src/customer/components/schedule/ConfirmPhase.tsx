import React, { useState } from 'react';
import { PaymentMethod } from './PaymentMethod';
import { PaymentInfo } from './PaymentInfo';
import { CleaningOption } from '@/customer/pages/schedule/SchedulePage';
import instance from '@/customer/api/axios';
import { useNavigate } from 'react-router-dom';

interface AddressInfo {
  mainAddress: string;
  subAddress: string;
  latitude: number;
  longitude: number;
}

// Contract 인터페이스 선언
interface ContractRequest {
  cleaningId: number;
  contractDate: string; // ISO string format
  address: string;
  subAddress: string;
  longitude: number;
  latitude: number;
  totalPrice: number;
  totalTime: number;
  personal: boolean;
  // contract_detail
  housingType: string;
  pet: string;
  request: string;
  // contract_option
  cleaningOptionList: number[];
}

// API 응답 인터페이스
interface ContractResponse {
  data: {
    contractId: number;
    routineContractId: number | null;
    customerId: number;
    managerId: number | null;
    cleaningId: number;
    contractDate: string;
    totalPrice: number;
    totalTime: number;
    personal: boolean;
    status: string;
    checkIn: string | null;
    checkOut: string | null;
    housingType: string;
    pet: string;
    request: string;
    cleaningOptionList: number[];
    longitude: number;
    latitude: number;
    address: string;
    subAddress: string;
  };
  code: string;
  message: string;
  success: boolean;
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
  const navigate = useNavigate();
  const confirmSchedule = async () => {
  

    // Contract 데이터 생성
    const contractData: ContractRequest = {
      cleaningId: 1, // 임시값, 실제로는 선택된 청소 서비스 ID
      contractDate: new Date(`${serviceDate.toDateString()} ${serviceTime}`).toISOString(),
      address: addressInfo.mainAddress,
      subAddress: addressInfo.subAddress,
      longitude: addressInfo.longitude,
      latitude: addressInfo.latitude,
      totalPrice: totalPrice,
      totalTime: serviceDuration,
      personal: false,
      // contract_detail
      housingType: selectedServiceType,
      pet: 'none', // 임시값, 실제로는 펫 정보 입력받아야 함
      request: '', // 임시값, 실제로는 요청사항 입력받아야 함
      // contract_option
      cleaningOptionList: selectedOptions.map(option => option.id),
    };

    console.log('Contract Data:', contractData);
    
    
              try {
         const response = await instance.post<ContractResponse>('/contract', contractData);
         if (response.data.success) {
            navigate(`/schedule/${response.data.data.contractId}`);
         }
       } catch (error) {
        console.error('Contract creation failed:', error);
     }
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
        예약완료
      </button>

    </div>
  );
}; 