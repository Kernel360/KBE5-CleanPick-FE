import React from 'react';
import { ServiceTypeSelect } from './ServiceTypeSelect';
import { CleaningChecklist } from './CleaningChecklist';

interface ServicePhaseProps {
  selectedServiceType: string;
  onServiceTypeSelect: (type: string) => void;
  selectedItems: string[];
  onToggleItem: (id: string) => void;
}

export const ServicePhase = ({
  selectedServiceType,
  onServiceTypeSelect,
  selectedItems,
  onToggleItem
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
        />
      )}
    </div>
  );
};
