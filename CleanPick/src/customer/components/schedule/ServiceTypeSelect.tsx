import React from 'react';
import { cn } from '@/customer/lib/utils';
import { FaHome, FaBuilding } from 'react-icons/fa';
import { IoBagHandle } from "react-icons/io5";


interface ServiceTypeProps {
  selected: string;
  onSelect: (type: string) => void;
}

const serviceTypes = [
  {
    id: 'HOME',
    label: '가정집 청소',
    icon: <FaHome size={24} />,
  },
  {
    id: 'OFFICE',
    label: '사무실 청소',
    icon: <FaBuilding size={24} />,
  },
  {
    id: 'SPECIAL',
    label: '특수 청소',
    icon: <IoBagHandle size={24} />,
  },
];

export const ServiceTypeSelect = ({ selected, onSelect }: ServiceTypeProps) => {
  return (
    <div className="px-4">
      <h2 className="text-lg font-bold mb-4">서비스 유형</h2>
      <div className="flex flex-col gap-3">
        {serviceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={cn(
              "w-full h-16 rounded-xl flex items-center px-6",
              "transition-all duration-200",
              "border-2",
              selected === type.id
                ? "bg-primary/5 border-primary text-primary"
                : "bg-white border-gray-100 hover:border-gray-200"
            )}
          >
            <div className={cn(
              "rounded-lg p-2.5",
              selected === type.id
                ? "bg-primary/10 text-primary"
                : "bg-gray-50 text-gray-400"
            )}>
              {type.icon}
            </div>
            <span className={cn(
              "font-medium ml-4",
              selected === type.id
                ? "text-primary"
                : "text-gray-700"
            )}>
              {type.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}; 