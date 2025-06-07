import React, { useEffect, useState } from 'react';
import { ServiceTypeSelect } from './ServiceTypeSelect';
import { CleaningChecklist } from './CleaningChecklist';
import { CleaningOption } from '@/customer/pages/schedule/SchedulePage';
import instance from '@/common/api/axios';

interface ServicePhaseProps {
  selectedServiceId: number;
  setSelectedServiceId: (id: number) => void;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  totalTime: number;
  setTotalTime: React.Dispatch<React.SetStateAction<number>>;
  selectedServiceType: string;
  onServiceTypeSelect: (type: string, id: number) => void;
  selectedItems: string[];
  onToggleItem: (id: string) => void;
  selectedOptions: CleaningOption[];
  setSelectedOptions: (options: CleaningOption[] | ((prev: CleaningOption[]) => CleaningOption[])) => void;
  selectedOption?: number;
}

interface ApiResponse {
  data: CleaningOption[];
  code: string;
  message: string;
  success: boolean;
}
    
export const ServicePhase = ({
  selectedServiceType,
  onServiceTypeSelect,
  selectedServiceId,
  setSelectedServiceId,
  selectedItems,
  onToggleItem,
  totalPrice,
  setTotalPrice,
  totalTime,
  setTotalTime,
  selectedOptions,
  setSelectedOptions,
  selectedOption
}: ServicePhaseProps) => {
  const [cleaningOptions, setCleaningOptions] = useState<CleaningOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 옵션 데이터 가져오기
  useEffect(() => {
    const fetchOptions = async () => {
      
      if (!selectedServiceId || selectedServiceId === 0) {
        return;
      }
      
      setIsLoading(true);
      setError(null);
      try {
        const response = await instance.get<ApiResponse>(`/option/${selectedServiceId}`);
        setCleaningOptions(response.data.data);
      } catch (err) {
        setError('옵션을 불러오는데 실패했습니다.');
        console.error('Failed to fetch options:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [selectedServiceId]);

  // 선택된 옵션 처리
  useEffect(() => {
    console.log('selectedOption useEffect triggered:', {
      selectedOption,
      cleaningOptionsLength: cleaningOptions.length,
      selectedOptionsLength: selectedOptions.length,
      selectedItems
    });

    if (selectedOption && cleaningOptions.length > 0) {
      // 홈의 optionId와 실제 API 옵션 ID 매핑
      const optionIdMapping: { [key: number]: string } = {
        1: '에어컨 청소',
        2: '후드 청소', 
        3: '냉장고 청소'
      };

      // selectedOption에 해당하는 옵션명으로 실제 옵션 찾기
      const targetOptionName = optionIdMapping[selectedOption];
      console.log('Looking for option name:', targetOptionName);

      const option = cleaningOptions.find(opt => opt.name === targetOptionName);
      console.log('Found option for selectedOption:', option);
      
      if (option) {
        const isAlreadySelected = selectedOptions.some(selected => selected.id === option.id);
        console.log('Is option already selected:', isAlreadySelected);
        
        if (!isAlreadySelected) {
          console.log('Auto-selecting option:', option);
          setSelectedOptions([option]);
          
          // 아이템이 이미 선택되어 있지 않다면 토글
          if (!selectedItems.includes(option.id.toString())) {
            console.log('Toggling item:', option.id.toString());
            onToggleItem(option.id.toString());
          }
          
          // 가격과 시간 설정
          setTotalPrice(option.extraPrice);
          setTotalTime(option.extraDuration);
          console.log('Set price and time:', option.extraPrice, option.extraDuration);
        }
      } else {
        console.log('Option not found for name:', targetOptionName);
        console.log('Available options:', cleaningOptions.map(opt => ({ id: opt.id, name: opt.name })));
      }
    }
  }, [selectedOption, cleaningOptions, selectedOptions, selectedItems, setSelectedOptions, onToggleItem, setTotalPrice, setTotalTime]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600 text-sm">옵션을 불러오고 있습니다</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-6">
      <ServiceTypeSelect
        selected={selectedServiceType}
        onSelect={(type, id) => {
          onServiceTypeSelect(type, id);
          setSelectedServiceId(id);
        }}
      />

      {selectedServiceType && cleaningOptions.length > 0 && (
        <CleaningChecklist
          selectedItems={selectedItems}
          onToggleItem={onToggleItem}
          setTotalPrice={setTotalPrice}
          setTotalTime={setTotalTime}
          totalPrice={totalPrice}
          totalTime={totalTime}
          setSelectedOptions={setSelectedOptions}
          cleaningOptions={cleaningOptions}
        />
      )}
    </div>
  );
};

