import React, { useEffect } from 'react';
import { ServiceTypeSelect } from './ServiceTypeSelect';
import { CleaningChecklist } from './CleaningChecklist';
import { CleaningOption } from '@/pages/schedule/SchedulePage';

interface ServicePhaseProps {
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  totalTime: number;
  setTotalTime: (time: number) => void;
  selectedServiceType: string;
  onServiceTypeSelect: (type: string) => void;
  selectedItems: string[];
  onToggleItem: (id: string) => void;
  selectedOptions: CleaningOption[];
  setSelectedOptions: (options: CleaningOption[] | ((prev: CleaningOption[]) => CleaningOption[])) => void;
  selectedOption?: number;
}
    
export const ServicePhase = ({
  selectedServiceType,
  onServiceTypeSelect,
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
  const cleaningOptions = [
    { id: 1, label: '에어컨 청소', extra_price: 30000, extra_time: 30 },
    { id: 2, label: '후드 청소', extra_price: 25000, extra_time: 25 },
    { id: 3, label: '냉장고 청소', extra_price: 35000, extra_time: 35 },
  ];

  useEffect(() => {
    if (selectedOption) {
      const option = cleaningOptions.find(option => option.id === selectedOption);
      if (option && !selectedOptions.some(selected => selected.id === option.id)) {
        setSelectedOptions([option]);
        if (!selectedItems.includes(option.id.toString())) {
          onToggleItem(option.id.toString());
        }
        setTotalPrice(option.extra_price);
        setTotalTime(option.extra_time);
      }
    }
  }, [selectedOption, selectedOptions, setSelectedOptions, onToggleItem, setTotalPrice, setTotalTime, selectedItems]);

  return (
    <div className="mt-6">
      <ServiceTypeSelect
        selected={selectedServiceType}
        onSelect={onServiceTypeSelect}
      />

      {selectedServiceType && (
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
