import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  user: string;
  date: string;
  content: string;
  rating: number;
}

export const ReviewCard = ({ user, date, content, rating }: ReviewCardProps) => {
  return (
    <Card className="bg-gray-100 border-none">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="text-xs font-bold">{user}</div>
          <div className="text-yellow-500 text-xs">★ {rating}</div>
        </div>
        <p className={cn(
          "text-xs my-2 leading-snug",
          "line-clamp-3"
        )}>
          {content}
        </p>
        <div className="text-[11px] text-gray-500">{date}</div>
      </CardContent>
    </Card>
  );
}; 