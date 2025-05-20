import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ManagerCardProps {
  name: string;
  initial: string;
  rating: number;
  service: string;
}

export const ManagerCard = ({ name, initial, rating, service }: ManagerCardProps) => {
  return (
    <Card className={cn(
      "bg-gray-100 border-none",
      "w-[110px] md:w-[220px]",
      "hover:bg-gray-200 transition-colors cursor-pointer"
    )}>
      <CardContent className={cn(
        "flex flex-col items-center py-3",
        "space-y-1"
      )}>
        <div className={cn(
          "w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full",
          "flex items-center justify-center text-base font-bold"
        )}>
          {initial}
        </div>
        <div className="text-sm font-bold">{name}</div>
        <div className="text-yellow-500 text-xs">★ {rating}</div>
        <div className="text-[11px] text-gray-500">{service}</div>
      </CardContent>
    </Card>
  );
}; 