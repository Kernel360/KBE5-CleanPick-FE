import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/customer/components/ui/card';
import { cn } from '@/customer/lib/utils';

interface ServiceCardProps {
  icon: ReactNode;
  label: string;
  type: string;
  optionId?: number;
  onClick?: () => void;
}

export const ServiceCard = ({ icon, label, type, optionId, onClick }: ServiceCardProps) => {
  return (
    <Card 
      className={cn(
        "bg-gray-100 border-none md:w-[200px] w-[100px] h-[100px] ",
        "hover:bg-gray-200 transition-colors cursor-pointer "
      )}
      onClick={onClick}
    >
      <CardContent className={cn(
        "flex flex-col items-center py-6",
        "space-y-2"
      )}>
        <span className="text-xl">{icon}</span>
        <span className="text-sm text-center font-medium">{label}</span>
      </CardContent>
    </Card>
  );
}; 