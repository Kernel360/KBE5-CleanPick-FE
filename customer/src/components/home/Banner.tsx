import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className={cn(
      "bg-primary-sub text-white p-6",
      "flex flex-col items-start",
      "w-full",
      "rounded-b-xl"
    )}>
      <h2 className="text-lg font-bold mb-2">깨끗한 공간을 위한 최고의 선택</h2>
      <p className="text-sm mb-4">전문 청소 매니저와 함께 깨끗한 공간을 만들어보세요.</p>
      <Button
        variant="outline"
        className={cn(
          "bg-white text-indigo-600 hover:bg-indigo-50",
          "border-none font-bold, px-10",
          "hover:cursor-pointer",
          "rounded-full"
        )}
        onClick={() => navigate('/schedule')}
      >
        시작하기 +
      </Button>
    </div>
  );
}; 