import React, { useState } from 'react';
import { ProgressSteps } from '@/components/schedule/ProgressSteps';
import { ServicePhase } from '@/components/schedule/ServicePhase';
import { SchedulePhase } from '@/components/schedule/SchedulePhase';
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";

export const SchedulePage = () => {
    const navigate = useNavigate();
    const [currentPhase, setCurrentPhase] = useState(1);
    
    // 서비스 선택 단계 상태
    const [selectedServiceType, setSelectedServiceType] = useState('');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    
    // 일정 선택 단계 상태 (Phase 2)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [location, setLocation] = useState('');
    
    // 결제 단계 상태 (Phase 3)
    const [paymentMethod, setPaymentMethod] = useState('');

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

    // 현재 단계에 따른 컴포넌트 렌더링
    const renderPhase = () => {
        switch (currentPhase) {
            case 1:
                return (
                    <ServicePhase
                        selectedServiceType={selectedServiceType}
                        onServiceTypeSelect={setSelectedServiceType}
                        selectedItems={selectedItems}
                        onToggleItem={handleToggleItem}
                    />
                );
            case 2:
                return (
                    <SchedulePhase
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                        selectedTime={selectedTime}
                        onTimeSelect={setSelectedTime}
                        location={location}
                        onLocationChange={setLocation}
                    />
                );
            case 3:
                // 추후 구현: 결제 컴포넌트
                return <div>결제 단계</div>;
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
                return selectedDate && selectedTime && location;
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