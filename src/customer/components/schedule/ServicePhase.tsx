import React, { useEffect, useState } from 'react';
import { ServiceTypeSelect } from './ServiceTypeSelect';
import { CleaningChecklist } from './CleaningChecklist';
import { CleaningOption } from '@/customer/pages/schedule/SchedulePage';
import instance from '@/common/api/axios';

interface ServicePhaseProps {
  selectedServiceId: number;
  setSelectedServiceId: (id: number) => void;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  totalTime: number;
  setTotalTime: (time: number) => void;
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
      if (!selectedServiceId) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const response = await instance.get<ApiResponse>(`/option/${selectedServiceId}`);
        console.log('Fetched options:', response.data.data);
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
    if (selectedOption && cleaningOptions.length > 0) {
      const option = cleaningOptions.find(opt => opt.id === selectedOption);
      if (option && !selectedOptions.some(selected => selected.id === option.id)) {
        setSelectedOptions([option]);
        if (!selectedItems.includes(option.id.toString())) {
          onToggleItem(option.id.toString());
        }
        setTotalPrice(option.extraPrice);
        setTotalTime(option.extraDuration);
      }
    }
  }, [selectedOption, cleaningOptions, selectedOptions, setSelectedOptions, onToggleItem, setTotalPrice, setTotalTime, selectedItems]);

  if (isLoading) {
    return <div className="p-4 text-center">옵션을 불러오는 중...</div>;
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

