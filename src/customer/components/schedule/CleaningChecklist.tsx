import { CleaningOption } from '@/customer/pages/schedule/SchedulePage';
import React, { useMemo, useState } from 'react';

interface ChecklistProps {
  selectedItems: string[];
  onToggleItem: (id: string) => void;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  totalTime: number;
  setTotalTime: React.Dispatch<React.SetStateAction<number>>;
  setSelectedOptions: (options: CleaningOption[] | ((prev: CleaningOption[]) => CleaningOption[])) => void;
  cleaningOptions: CleaningOption[];
}

function calculateTime(time: number) {
  const hour = Math.floor(time / 60);
  const minute = Math.floor(time % 60);
  return `${hour}시간 ${minute}분`;
}

export const CleaningChecklist = ({ 
  selectedItems, 
  onToggleItem, 
  totalPrice,
  setTotalPrice, 
  totalTime,
  setTotalTime, 
  setSelectedOptions,
  cleaningOptions
}: ChecklistProps) => {
  const [isRoomSizeModalOpen, setIsRoomSizeModalOpen] = useState(false);

  console.log('CleaningChecklist rendered with options:', cleaningOptions);

  const { roomSizeOptions, normalOptions } = useMemo(() => {
    return {
      roomSizeOptions: cleaningOptions.filter(opt => opt.type === "방크기"),
      normalOptions: cleaningOptions.filter(opt => opt.type !== "방크기")
    };
  }, [cleaningOptions]);

  const handleToggle = (option: CleaningOption, isRoomSize: boolean = false) => {
    const isSelected = selectedItems.includes(option.id.toString());
    
    if (isRoomSize) {
      // 방크기 옵션 선택 시 기존 방크기 옵션 제거
      const prevRoomSize = selectedItems.find(id => 
        roomSizeOptions.some(opt => opt.id.toString() === id)
      );
      
      if (prevRoomSize) {
        const prevOption = roomSizeOptions.find(opt => opt.id.toString() === prevRoomSize);
        if (prevOption) {
          setTotalPrice(prev => prev - prevOption.extraPrice);
          setTotalTime(prev => prev - prevOption.extraDuration);
          setSelectedOptions(prev => prev.filter(item => item.id !== prevOption.id));
          onToggleItem(prevOption.id.toString());
        }
      }

      setTotalPrice(prev => prev + option.extraPrice);
      setTotalTime(prev => prev + option.extraDuration);
      setSelectedOptions(prev => [...prev.filter(item => !roomSizeOptions.some(ro => ro.id === item.id)), option]);
      onToggleItem(option.id.toString());
    } else {
      // 일반 옵션 토글
      setTotalPrice(prev => 
        isSelected 
          ? prev - option.extraPrice
          : prev + option.extraPrice
      );
      
      setTotalTime(prev => 
        isSelected 
          ? prev - option.extraDuration
          : prev + option.extraDuration
      );
      
      setSelectedOptions(prev => 
        isSelected
          ? prev.filter(item => item.id !== option.id)
          : [...prev, option]
      );
      
      onToggleItem(option.id.toString());
    }
  };

  const handleRoomSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!selectedId) return;

    const selectedOption = roomSizeOptions.find(opt => opt.id.toString() === selectedId);
    if (selectedOption) {
      handleToggle(selectedOption, true);
    }
  };

  const selectedRoomSize = roomSizeOptions.find(opt => 
    selectedItems.includes(opt.id.toString())
  );

  return (
    <div className="px-4 mt-[50px]">
      {/* 방크기 옵션 */}
      {roomSizeOptions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">방 크기 선택</h2>
          <button
            onClick={() => setIsRoomSizeModalOpen(true)}
            className="w-full h-[60px] px-6 bg-white rounded-2xl border-2 
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
              text-left relative
              hover:border-gray-200 hover:bg-gray-50 transition-all duration-200"
          >
            <span className={selectedRoomSize ? "text-primary font-bold" : "text-gray-400"}>
              {selectedRoomSize ? selectedRoomSize.name : "방 크기를 선택해주세요"}
            </span>
            <div className="absolute inset-y-0 right-0 flex items-center pr-6">
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                <svg 
                  className="w-5 h-5 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2.5" 
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </button>

          {/* 방크기 선택 모달 */}
          {isRoomSizeModalOpen && (
            <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
              <div 
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setIsRoomSizeModalOpen(false)}
              />
              <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-bold">방 크기 선택</h3>
                  <button 
                    onClick={() => setIsRoomSizeModalOpen(false)}
                    className="p-2  rounded-lg transition-colors bg-white text-black"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {roomSizeOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          handleToggle(option, true);
                          setIsRoomSizeModalOpen(false);
                        }}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-200 bg-white text-gray-600
                          ${selectedItems.includes(option.id.toString())
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-100 hover:border-primary hover:bg-gray-50'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold">{option.name}</span>
                          <span className="text-lg font-bold">
                            {option.extraPrice.toLocaleString()}원
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg 
                            className="w-4 h-4 mr-1.5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {calculateTime(option.extraDuration)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedRoomSize && (
            <div className="mt-4 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/10">
              <div className="flex items-center mb-3">
                
                <div className="flex-1">
                  <div className="text-sm text-gray-500">선택된 크기</div>
                  <div className="text-lg font-bold text-gray-900">{selectedRoomSize.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">추가 비용</div>
                  <div className="text-lg font-bold text-primary">+{selectedRoomSize.extraPrice.toLocaleString()}원</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg 
                  className="w-4 h-4 mr-1.5 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                추가 소요시간: {calculateTime(selectedRoomSize.extraDuration)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 일반 옵션 */}
      {normalOptions.length > 0 && (
        <>
          <h2 className="text-lg font-bold mb-4">추가 서비스</h2>
          <div className="space-y-3">
            {normalOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 cursor-pointer group hover:border-gray-200 transition-colors"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={selectedItems.includes(option.id.toString())}
                    onChange={() => handleToggle(option)}
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-primary peer-checked:bg-primary transition-colors" />
                  <svg 
                    className="absolute inset-0 w-5 h-5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity"
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
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{option.name}</span>
                    <span className="text-sm font-medium text-primary">+{option.extraPrice.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">{option.type}</span>
                    <span className="text-xs text-gray-500">+{calculateTime(option.extraDuration)}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </>
      )}

      {cleaningOptions.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          선택 가능한 옵션이 없습니다.
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">추가 요청사항</h3>
        <textarea
          placeholder="특별히 신경써야 할 부분이나 요청사항을 적어주세요..."
          className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      <div className="mt-6 border border-primary/20 bg-primary/5 p-4 rounded-lg text-primary">
        <div className="flex justify-between items-center text-sm">
          <span>예상 소요시간</span>
          <span className="font-medium">{calculateTime(totalTime)}</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-1">
          <span>예상 견적</span>
          <span className="font-medium">{totalPrice.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
}; 