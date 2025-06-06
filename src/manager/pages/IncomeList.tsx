import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HeaderNav from '@/manager/layer/HeaderNav';
import BottomNav from '@/manager/layer/BottomNav';
import RequestTabs from '@/manager/components/RequestTabsProps';
import ScheduleCard from '@/manager/components/scheduleCard';
import { useIncomeList } from '../components/hooks/useIncomeList';
import { useNavigate } from 'react-router-dom';

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
  const [page, setPage] = useState(0);
  const { data, total, hasMore, loading, error } = useIncomeList(page);
  const navigate = useNavigate();

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
          <button onClick={handlePrevMonth} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
            <FaChevronLeft size={16} color="text-white" />
          </button>
          <div className="text-lg font-semibold">{formattedMonth}</div>
          <button onClick={handleNextMonth} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
            <FaChevronRight size={16} className="text-white" />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-4 text-center">
          <div className="text-gray-500 text-sm mb-1">총 수입</div>
          <div className="text-2xl font-bold">{total.toLocaleString()}원</div>
        </div>

        {/* 탭 */}
        <RequestTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={['근무 내역', '예정 내역']}
        />

        {/* 탭 콘텐츠 */}
        {loading && (
          <div className="text-center text-gray-400 py-8">로딩 중...</div>
        )}
        {error && (
          <div className="text-center text-red-500 py-8">{error}</div>
        )}
        {!loading && !error && data.length === 0 && (
          <div className="text-center text-gray-400 py-8">수입 내역이 없습니다.</div>
        )}
        <div className="space-y-3">
          {data.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => navigate(`/reservation/${item.reservationId}`)}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">{item.date} ({item.dayOfWeek})</span>
                <span className="font-bold text-indigo-600">{item.amount.toLocaleString()}원</span>
              </div>
              <div className="text-gray-500 text-sm">{item.startTime} ~ {item.endTime}</div>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            className="w-full mt-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold"
            onClick={() => setPage(p => p + 1)}
          >
            더보기
          </button>
        )}
      </main>

      <BottomNav />
    </div>
  );
}; 