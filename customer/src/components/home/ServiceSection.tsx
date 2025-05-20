import React, { useRef, useState, MouseEvent } from 'react';
import { ServiceCard } from './ServiceCard';
import { cn } from '@/lib/utils';
import { LuHouse } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbAirConditioning } from "react-icons/tb";
import { GiCookingPot } from "react-icons/gi";
import { LuRefrigerator } from "react-icons/lu";

const serviceList = [
  { icon: <LuHouse className="text-primary" />, label: '가정집 청소' },
  { icon: <HiOutlineBuildingOffice2 className="text-primary" />, label: '사무실 청소' },
  { icon: <TbAirConditioning className="text-primary" />, label: '에어컨 청소' },
  { icon: <GiCookingPot className="text-primary" />, label: '후드 청소' },
  { icon: <LuRefrigerator className="text-primary" />, label: '냉장고 청소' },
];

export const ServiceSection = () => {
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
    <section className="mt-6">
      <div className="text-base font-bold mb-2 ml-5">서비스 선택</div>
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={cn(
          
          "flex overflow-x-auto gap-3 px-4 pb-4",
          "scrollbar-hide snap-x snap-proximity",
          "select-none cursor-grab active:cursor-grabbing",
          "scroll-smooth"
        )}
      >
        {serviceList.map((service) => (
          <div 
            key={service.label} 
            className="snap-center shrink-0"
            onDragStart={(e) => e.preventDefault()}
          >
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
    </section>
  );
}; 