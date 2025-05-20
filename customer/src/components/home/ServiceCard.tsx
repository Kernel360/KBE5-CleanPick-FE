import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: ReactNode;
  label: string;
}

export const ServiceCard = ({ icon, label }: ServiceCardProps) => {
  return (
    <Card className={cn(
      "bg-gray-100 border-none md:w-[200px] w-[100px] h-[100px] ",
      "hover:bg-gray-200 transition-colors cursor-pointer "
    )}>
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