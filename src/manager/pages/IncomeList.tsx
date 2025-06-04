import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HeaderNav from '@/manager/layer/HeaderNav';
import BottomNav from '@/manager/layer/BottomNav';
import RequestTabs from '@/manager/components/RequestTabsProps';
import ScheduleCard from '@/manager/components/scheduleCard';

interface Schedule {
  id: number;
  category: string;
  title: string;
  time: string;
  address: string;
  customer: string;
  rating: string;
  status: 'ready' | 'checked-in' | 'completed';
}

const dummySchedules: Schedule[] = [
  {
    id: 1,
    category: '근무 내역',
    title: '오피스 청소',
    time: '09:00 AM - 11:00 AM',
    address: '서울시 강남구 테헤란로 1',
    customer: '홍길동',
    rating: '4.9',
    status: 'completed',
  },
  {
    id: 2,
    category: '예정 내역',
    title: '가정집 청소',
    time: '2:00 PM - 4:00 PM',
    address: '서울시 마포구 월드컵북로 10',
    customer: '이영희',
    rating: '5.0',
    status: 'ready',
  },
];

export const IncomeList: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<string>('근무 내역');

  const handlePrevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const formattedMonth = format(currentDate, 'yyyy년 M월', { locale: ko });

  const filtered = dummySchedules.filter(
    (item) => item.category === activeTab
  );

  return (
    <div className="pt-[3.5rem] pb-14 px-4">
      <HeaderNav title="수입 내역" showBack={true} />

      <main className="mt-4">
        {/* 월 이동 */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={handlePrevMonth} className="p-2">
            <FaChevronLeft size={16} />
          </button>
          <div className="text-lg font-semibold">{formattedMonth}</div>
          <button onClick={handleNextMonth} className="p-2">
            <FaChevronRight size={16} />
          </button>
        </div>

        <div>총 수입 금액: ₩2,850,000</div>

        {/* 탭 */}
        <RequestTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={['근무 내역', '예정 내역']}
        />

        {/* 탭 콘텐츠 */}
        <div className="bg-white shadow rounded-lg p-4 text-gray-700 text-sm">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <ScheduleCard
                key={item.id}
                {...item}
                onStatusChange={() => {}}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              해당 내역이 없습니다.
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}; 