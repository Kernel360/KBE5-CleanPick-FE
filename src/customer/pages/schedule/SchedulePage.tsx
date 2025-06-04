import React, { useState, useEffect } from 'react';
import { ProgressSteps } from '@/customer/components/schedule/ProgressSteps';
import { ServicePhase } from '@/customer/components/schedule/ServicePhase';
import { SchedulePhase } from '@/customer/components/schedule/SchedulePhase';
import { Header } from "@/customer/components/layout/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { PaymentPhase } from '@/customer/components/schedule/PaymentPhase';  

export interface CleaningOption {
    id: number;
    type: string;
    name: string;
    extraPrice: number;
    extraDuration: number;
}

export const SchedulePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedOption: number = location.state?.selectedOption;
    const [currentPhase, setCurrentPhase] = useState(1);
    
    // 서비스 선택 단계 상태 (Phase 1)
    const [selectedServiceId, setSelectedServiceId] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [selectedServiceType, setSelectedServiceType] = useState('');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<CleaningOption[]>([]);
    
    // 일정 선택 단계 상태 (Phase 2)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedHour, setSelectedHour] = useState<string>('');
    const [selectedMinute, setSelectedMinute] = useState<string>('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    // 결제 단계 상태 (Phase 3)
    const [paymentMethod, setPaymentMethod] = useState('');

    // location state에서 선택된 서비스 타입 가져오기
    useEffect(() => {
        const state = location.state as { selectedService?: string; selectedOption?: number };
        if (state?.selectedService) {
            setSelectedServiceType(state.selectedService);
            if (state.selectedOption) {
                setSelectedItems([state.selectedOption.toString()]);
            }
        }
    }, [location]);

    // 체크리스트 아이템 토글 핸들러
    const handleToggleItem = (id: string) => {
        setSelectedItems(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    // 다음 단계로 이동
    const handleNextPhase = () => {
        if (currentPhase < 3) {
            setCurrentPhase(prev => prev + 1);
        }
    };

    // 이전 단계로 이동
    const handlePrevPhase = () => {
        if (currentPhase > 1) {
            setCurrentPhase(prev => prev - 1);
        }
    };

    const onServiceTypeSelect = (type: string, id: number) => {
        setSelectedServiceType(type);
        setSelectedServiceId(id);
    }

    // 현재 단계에 따른 컴포넌트 렌더링
    const renderPhase = () => {
        switch (currentPhase) {
            case 1:
                return (
                    <ServicePhase
                        selectedServiceId={selectedServiceId}
                        setSelectedServiceId={setSelectedServiceId}
                        selectedServiceType={selectedServiceType}
                        onServiceTypeSelect={onServiceTypeSelect}
                        selectedItems={selectedItems}
                        onToggleItem={handleToggleItem}
                        totalPrice={totalPrice}
                        setTotalPrice={setTotalPrice}
                        totalTime={totalTime}
                        setTotalTime={setTotalTime}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                        selectedOption={selectedOption}
                    />
                );
            case 2:
                return (
                    <SchedulePhase
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                        selectedHour={selectedHour}
                        selectedMinute={selectedMinute}
                        onHourSelect={setSelectedHour}
                        onMinuteSelect={setSelectedMinute}
                        location={address}
                        onLocationChange={setAddress}
                        detailAddress={detailAddress}
                        onDetailAddressChange={setDetailAddress}
                    />
                );
            case 3:
                return (
                    <PaymentPhase
                        selectedServiceType={selectedServiceType}
                        selectedOptions={selectedOptions}
                        totalPrice={totalPrice}
                        serviceDate={selectedDate as Date}
                        serviceTime={`${selectedHour}:${selectedMinute}`}
                        serviceAddress={address}
                        serviceAddressDetail={detailAddress}
                        serviceDuration={totalTime}
                        paymentMethod={paymentMethod as 'cash' | 'card'}
                        onPaymentMethodChange={setPaymentMethod}
                        onNext={handleNextPhase}
                        onPrev={handlePrevPhase}
                    />
                );
            default:
                return null;
        }
    };

    // 현재 단계에 따른 다음 단계 버튼 활성화 여부
    const isNextButtonEnabled = () => {
        switch (currentPhase) {
            case 1:
                return selectedServiceType && selectedItems.length > 0;
            case 2:
                return selectedDate && selectedHour && selectedMinute && address && detailAddress;
            default:
                return false;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header 
                title="예약하기" 
                showBack={true}
                showIcons={false}
                onBackClick={currentPhase === 1 ? () => navigate(-1) : handlePrevPhase}
            />
            
            <div className="pt-[3.5rem] pb-[140px] md:pb-[100px]">
                <ProgressSteps currentStep={currentPhase} />
                {renderPhase()}
            </div>
                
            {/* 다음 단계 버튼 */}
            {currentPhase < 3 && (
                <div className="fixed bottom-[50px] md:bottom-0 left-0 right-0 p-4 bg-white border-t">
                    <button
                        onClick={handleNextPhase}
                        disabled={!isNextButtonEnabled()}
                        className={`w-full py-3 rounded-lg font-medium transition-colors
                            ${isNextButtonEnabled()
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                        다음 단계
                    </button>
                </div>
            )}
        </div>
    );
};

export default SchedulePage;