import React from 'react';
import { ServiceTypeSelect } from './ServiceTypeSelect';
import { CleaningChecklist } from './CleaningChecklist';

interface ServicePhaseProps {
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  totalTime: number;
  setTotalTime: (time: number) => void;
  selectedServiceType: string;
  onServiceTypeSelect: (type: string) => void;
  selectedItems: string[];
  onToggleItem: (id: string) => void;
}

export const ServicePhase = ({
  selectedServiceType,
  onServiceTypeSelect,
  selectedItems,
  onToggleItem,
  totalPrice,
  setTotalPrice,
  totalTime,
  setTotalTime
}: ServicePhaseProps) => {
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
        />
      )}
    </div>
  );
};
