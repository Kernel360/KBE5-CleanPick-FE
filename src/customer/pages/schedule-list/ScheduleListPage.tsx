import React, { useState, useMemo } from 'react';
import { Header } from "@/customer/components/layout/Header"
import { 
  ScheduleListItem, 
  ManagerSelectionModal, 
  ScheduleFilterTabs,
  Schedule, 
  Manager,
  ScheduleFilterType 
} from '@/customer/components/schedule-list';

// 샘플 데이터
const initialSchedules: Schedule[] = [
  {
    id: '1',
    title: '가정집 청소',
    date: '6월 20일, 오전',
    time: '10:00 - 12:00',
    address: '비래인안 시서, 123번지',
    status: 'pending',
    helperCount: 1,
    isHelperAssigned: false
  },
  {
    id: '2',
    title: '상무원 청소',
    date: '6월 16일, 오후',
    time: '2:00 - 5:00',
    address: '비래인안 상무지구, 456번지',
    status: 'pending',
    helperCount: 1,
    isHelperAssigned: false
  },
  {
    id: '3',
    title: '화장실 청소',
    date: '6월 17일, 오전',
    time: '9:00 - 11:00',
    address: '비래인안 북부, 789번지',
    status: 'completed',
    helperCount: 1,
    isHelperAssigned: true
  },
  {
    id: '4',
    title: '사무실 청소',
    date: '6월 18일, 오후',
    time: '3:00 - 6:00',
    address: '비래인안 서구, 101번지',
    status: 'matched',
    helperCount: 1,
    isHelperAssigned: false,
    selectedManager: {
      id: '1',
      name: '김청소',
      rating: 4.8,
      experience: '3년 경력',
      distance: '2.5km',
      status: 'available',
      price: 50000
    }
  }
];

export const ScheduleListPage = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<ScheduleFilterType>('pending');

  // 필터링된 스케줄과 카운트 계산
  const filteredSchedules = useMemo(() => {
    return schedules.filter(schedule => schedule.status === activeFilter);
  }, [schedules, activeFilter]);

  const scheduleCounts = useMemo(() => {
    const pending = schedules.filter(s => s.status === 'pending').length;
    const matched = schedules.filter(s => s.status === 'matched').length;
    const completed = schedules.filter(s => s.status === 'completed').length;
    
    return { pending, matched, completed };
  }, [schedules]);

  const handleManageHelper = (scheduleId: string) => {
    console.log('매니저 선택하기:', scheduleId);
    setSelectedScheduleId(scheduleId);
    setIsModalOpen(true);
  };

  const handleSelectManager = (manager: Manager) => {
    console.log('매니저 선택됨:', manager);
    
    setSchedules(prev => prev.map(schedule => 
      schedule.id === selectedScheduleId 
        ? { 
            ...schedule, 
            selectedManager: manager,
            isHelperAssigned: true,
            status: schedule.status === 'pending' ? 'matched' : schedule.status
          }
        : schedule
    ));
    
    setIsModalOpen(false);
    setSelectedScheduleId('');
  };

  const handleViewStatus = (scheduleId: string) => {
    console.log('상태 보기:', scheduleId);
    // 상태 상세 페이지로 이동하는 로직
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScheduleId('');
  };

  const handleFilterChange = (filter: ScheduleFilterType) => {
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="예약 목록"
        showBack={true}
      />
      
      {/* 탭 필터 */}
      <div className="pt-[3.5rem]">
        <ScheduleFilterTabs
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          pendingCount={scheduleCounts.pending}
          matchedCount={scheduleCounts.matched}
          completedCount={scheduleCounts.completed}
        />
      </div>

      {/* 스케줄 리스트 */}
      <div className="pb-[100px]">
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => (
            <ScheduleListItem
              key={schedule.id}
              schedule={schedule}
              onManageHelper={handleManageHelper}
              onViewStatus={handleViewStatus}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-gray-400 mb-2">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-center">
              {activeFilter === 'pending' && '수락 대기 중인 예약이 없습니다'}
              {activeFilter === 'matched' && '매칭 완료된 예약이 없습니다'}
              {activeFilter === 'completed' && '완료된 예약이 없습니다'}
            </p>
          </div>
        )}
      </div>

      <ManagerSelectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectManager={handleSelectManager}
        scheduleId={selectedScheduleId}
      />
    </div>
  )
}