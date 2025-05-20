import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressStepsProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Service' },
  { number: 2, label: 'Schedule' },
  { number: 3, label: 'Payment' },
];

export const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="flex justify-between items-center px-8 py-3 mt-[56px] relative">
      {/* 연결선 */}
      <div className="absolute top-1/2 -translate-y-[0.8rem] left-[calc(4rem+15px)] right-[calc(4rem+15px)] flex justify-between">
        <div className="w-[calc(50%-1rem)] h-[2px] bg-gray-200">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{
              width: currentStep > 1 ? '100%' : '0%'
            }}
          />
        </div>
        <div className="w-[calc(50%-1rem)] h-[2px] bg-gray-200">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{
              width: currentStep > 2 ? '100%' : '0%'
            }}
          />
        </div>
      </div>

      {steps.map((step) => (
        <div 
          key={step.number}
          className="flex flex-col items-center relative z-10"
        >
          <div className="bg-gray-50 p-1.5 rounded-full">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-base",
              "transition-colors duration-300 ease-in-out",
              "border-2",
              currentStep === step.number 
                ? "bg-primary border-primary text-white"
                : currentStep > step.number
                ? "bg-primary border-primary text-white"
                : "bg-white border-gray-200 text-gray-500"
            )}>
              {step.number}
            </div>
          </div>
          <span className={cn(
            "text-xs mt-1",
            "transition-colors duration-300 ease-in-out",
            currentStep === step.number 
              ? "text-primary font-medium"
              : currentStep > step.number
              ? "text-primary font-medium"
              : "text-gray-500"
          )}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}; 