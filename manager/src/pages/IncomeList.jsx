import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HeaderNav from '@/layer/NavHeader';
import BottomNav from '@/layer/NavBottom';

const tabs = ['근무 내역', '예정 내역'];

const IncomeList = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('총 금액');

    const handlePrevMonth = () => {
        setCurrentDate(prev => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => addMonths(prev, 1));
    };

    const formattedMonth = format(currentDate, 'yyyy년 M월', { locale: ko });

    return (
        <div className="pt-[3.5rem] pb-14 px-4">
            <HeaderNav title="수입 내역" showBack={true}/>
            {/* 여기에 페이지 뒤로가기 기능 만들어줘 */}
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
                <div className="flex gap-2 mb-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {/* 탭 콘텐츠 */}
                <div className="bg-white shadow rounded-lg p-4 text-gray-700 text-sm">
                    {activeTab === '근무 내역' && <div>근무한 내역 목록 출력 영역</div>}
                    {activeTab === '예정 내역' && <div>예정된 일정 목록 출력 영역</div>}
                </div>
            </main>

            <BottomNav />
        </div>
    );
};

export default IncomeList;
