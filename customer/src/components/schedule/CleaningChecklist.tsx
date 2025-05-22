import { CleaningOption } from '@/pages/schedule/SchedulePage';
import React from 'react';

interface ChecklistProps {
  selectedItems: string[];
  onToggleItem: (id: string) => void;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  totalTime: number;
  setTotalTime: (time: number) => void;
  setSelectedOptions: (options: CleaningOption[] | ((prev: CleaningOption[]) => CleaningOption[])) => void;
  cleaningOptions: CleaningOption[];
}

function calulateTime(time: number) {
  const hour = Math.floor(time / 60);
  const minute = Math.floor(time  % 60);
  return `${hour}시간 ${minute}분`;
}

export const CleaningChecklist = ({ 
  selectedItems, 
  onToggleItem, 
  setTotalPrice, 
  setTotalTime, 
  totalPrice, 
  totalTime, 
  setSelectedOptions,
  cleaningOptions,
}: ChecklistProps) => {

  return (
    <div className="px-4 mt-6">
      <h2 className="text-lg font-bold mb-4">청 소 요구사항</h2>
      <div className="space-y-3">
        {cleaningOptions.map((item) => (
          <label
            key={item.id}
            className="relative flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group"
          >
            <div className="relative w-5 h-5">
              <input
                type="checkbox"
                id={item.id.toString()}
                checked={selectedItems.includes(item.id.toString())}
                onChange={() => {
                  const isSelected = selectedItems.includes(item.id.toString());
                  if (!isSelected) {
                    // 체크 시: 가격과 시간 추가
                    const newPrice = totalPrice + item.extra_price;
                    const newTime = totalTime + item.extra_time;
                    setTotalPrice(newPrice);
                    setTotalTime(newTime);
                    setSelectedOptions((prev: CleaningOption[]) => [...prev, item]);
                  } else {
                    // 체크 해제 시: 가격과 시간 차감
                    const newPrice = totalPrice - item.extra_price;
                    const newTime = totalTime - item.extra_time;
                    setTotalPrice(newPrice);
                    setTotalTime(newTime);
                    setSelectedOptions((prev: CleaningOption[]) => prev.filter((option: CleaningOption) => option.id !== item.id));
                  }
                  onToggleItem(item.id.toString());
                }}
                className="peer appearance-none w-5 h-5 border-2 border-primary rounded transition-colors cursor-pointer hover:border-primary/70"
              />
              <svg 
                className="absolute inset-0 w-5 h-5 pointer-events-none opacity-0 peer-checked:opacity-100 text-primary transition-opacity"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M5.5 10L8.5 13L14.5 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900">{item.label}</span>
          </label>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">추가 요청사항</h3>
        <textarea
          placeholder="특별히 신경써야 할 부분이나 요청사항을 적어주세요..."
          className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      <div className="mt-6  bg-gray-50 p-4 rounded-lg ">
        <div className="flex justify-between items-center text-sm mt-2">
          <span>예상 소요시간</span>
          <span className="font-medium">{calulateTime(totalTime)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>예상 견적</span>
          <span className="font-medium">{totalPrice} 원</span>
        </div>
      </div>
    </div>
  );
}; 