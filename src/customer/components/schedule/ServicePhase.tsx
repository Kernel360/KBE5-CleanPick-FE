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

