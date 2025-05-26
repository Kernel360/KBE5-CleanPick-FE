import React, {useRef, useState, MouseEvent} from 'react';
import { ManagerCard } from './ManagerCard';
import { cn } from '@/customer/lib/utils';
const managerList = [
  { name: '홍길동', initial: '홍', rating: 4.9, service: '가정집 청소' },
  { name: '김말수', initial: '김', rating: 4.8, service: '사무실 청소' },
  { name: '이연희', initial: '이', rating: 4.7, service: '특수 청소' },
  { name: '홍길동', initial: '홍', rating: 4.9, service: '가정집 청소' },
  { name: '김말수', initial: '김', rating: 4.8, service: '사무실 청소' },
  { name: '이연희', initial: '이', rating: 4.7, service: '특수 청소' },
  { name: '홍길동', initial: '홍', rating: 4.9, service: '가정집 청소' },
 
];

export const ManagerSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section>
      <div className="flex justify-between items-center mt-6 mx-4">
        <div className="text-base font-bold">인기 매니저</div>
        <div className="text-indigo-600 text-xs cursor-pointer hover:text-indigo-700">
          전체보기
        </div>
      </div>
      <div   
      ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={cn(
          "flex overflow-x-auto gap-3 px-4 pb-4 mt-2",
          "scrollbar-hide",
          "select-none cursor-grab active:cursor-grabbing",
          "scroll-smooth"
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