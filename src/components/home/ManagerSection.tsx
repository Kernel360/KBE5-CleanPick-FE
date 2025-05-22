import React from 'react';
import { ManagerCard } from './ManagerCard';
import { cn } from '@/lib/utils';

const managerList = [
  { name: '홍길동', initial: '홍', rating: 4.9, service: '가정집 청소' },
  { name: '김말수', initial: '김', rating: 4.8, service: '사무실 청소' },
  { name: '이연희', initial: '이', rating: 4.7, service: '에어컨 청소' },
  { name: '박철수', initial: '박', rating: 4.9, service: '후드 청소' },
  { name: '최영희', initial: '최', rating: 4.8, service: '냉장고 청소' },
  { name: '홍길동', initial: '홍', rating: 4.9, service: '가정집 청소' },
  { name: '김말수', initial: '김', rating: 4.8, service: '사무실 청소' },
  { name: '이연희', initial: '이', rating: 4.7, service: '에어컨 청소' },
  { name: '박철수', initial: '박', rating: 4.9, service: '후드 청소' },
  { name: '최영희', initial: '최', rating: 4.8, service: '냉장고 청소' },
];

export const ManagerSection = () => {
  return (
    <section>
      <div className="flex justify-between items-center mt-6 mx-4">
        <div className="text-base font-bold">인기 매니저</div>
        <div className="text-indigo-600 text-xs cursor-pointer hover:text-indigo-700">
          전체보기
        </div>
      </div>
      <div className={cn(
        "flex overflow-x-auto gap-3 px-4 pb-4 mt-2",
        "scrollbar-hide",
        "select-none touch-pan-x",
        "-webkit-overflow-scrolling-touch"
      )}>
        {managerList.map((manager) => (
          <div 
            key={manager.name} 
            className="shrink-0"
            onDragStart={(e) => e.preventDefault()}
          >
            <ManagerCard {...manager} />
          </div>
        ))}
      </div>
    </section>
  );
}; 