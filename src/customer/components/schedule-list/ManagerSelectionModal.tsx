import React, { useState } from 'react';
import { Button } from '@/customer/components/ui/button';
import { cn } from '@/customer/lib/utils';

export interface Manager {
  id: string;
  name: string;
  rating: number;
  experience: string;
  distance: string;
  status: 'available' | 'busy' | 'premium';
  avatar?: string;
  price?: number;
}

interface ManagerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectManager: (manager: Manager) => void;
  scheduleId: string;
}

// 더미 매니저 데이터
const dummyManagers: Manager[] = [
  {
    id: '1',
    name: '김청소',
    rating: 4.8,
    experience: '3년 경력',
    distance: '2.5km',
    status: 'available',
    price: 50000
  },
  {
    id: '2',
    name: '이정리',
    rating: 4.9,
    experience: '5년 경력',
    distance: '1.8km',
    status: 'premium',
    price: 70000
  },
  {
    id: '3',
    name: '박깔끔',
    rating: 4.6,
    experience: '2년 경력',
    distance: '3.2km',
    status: 'busy',
    price: 45000
  },
  {
    id: '4',
    name: '최완벽',
    rating: 4.9,
    experience: '7년 경력',
    distance: '4.1km',
    status: 'premium',
    price: 80000
  },
  {
    id: '5',
    name: '정빛깔',
    rating: 4.7,
    experience: '4년 경력',
    distance: '2.1km',
    status: 'available',
    price: 55000
  }
];

export const ManagerSelectionModal: React.FC<ManagerSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectManager,
  scheduleId
}) => {
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);

  if (!isOpen) return null;

  const getStatusText = (status: Manager['status']) => {
    switch (status) {
      case 'available':
        return '즉시 가능';
      case 'busy':
        return '바쁨';
      case 'premium':
        return '프리미엄';
      default:
        return '';
    }
  };

  const getStatusColor = (status: Manager['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-600';
      case 'busy':
        return 'bg-red-100 text-red-600';
      case 'premium':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleSelectManager = () => {
    if (selectedManager) {
      onSelectManager(selectedManager);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-w-md h-[80vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">매니저 선택</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 매니저 목록 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {dummyManagers.map((manager) => (
              <div
                key={manager.id}
                onClick={() => setSelectedManager(manager)}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all",
                  selectedManager?.id === manager.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{manager.name}</h3>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(manager.status)
                      )}>
                        {getStatusText(manager.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{manager.rating}</span>
                        <span className="mx-2">•</span>
                        <span>{manager.experience}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{manager.distance}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      {manager.price?.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleSelectManager}
            disabled={!selectedManager}
            className={cn(
              "w-full h-12",
              selectedManager
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            {selectedManager ? `${selectedManager.name} 선택하기` : '매니저를 선택해주세요'}
          </Button>
        </div>
      </div>
    </div>
  );
}; 