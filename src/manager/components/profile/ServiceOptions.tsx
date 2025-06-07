import React from 'react';
import { Check } from 'lucide-react';

interface ServiceOption {
  id: number;
  name: string;
  checked: boolean;
}

interface ServiceOptionsProps {
  services: ServiceOption[];
  onServiceChange: (serviceId: number, checked: boolean) => void;
}

export default function ServiceOptions({ services, onServiceChange }: ServiceOptionsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">서비스 정보</h2>
      
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">제공 가능한 서비스 (다중 선택 가능)</p>
        <div className="space-y-3">
          {services.map((service) => (
            <label 
              key={service.id} 
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={service.checked}
                  onChange={(e) => onServiceChange(service.id, e.target.checked)}
                  className="sr-only "
                />
                <div 
                  className={`
                    w-4 h-4 rounded-sm bg-white border border-primary flex items-center justify-center transition-all duration-150
                    border-rounded-full
                  `}
                >
                  {service.checked && (
                    <Check 
                      className="w-2.5 h-2.5 text-blue-600 stroke-[3]" 
                    />
                  )}
                </div>
              </div>
              <span className="ml-2.5 text-gray-800 text-sm">
                {service.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 