import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isToday,
    addMonths,
    subMonths,
    getDay,
  } from 'date-fns';
  import { ko } from 'date-fns/locale';
  import { useMemo } from 'react';
  import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
  
  interface CalendarProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    allSchedules: { date: string }[];
  }
  
  const Calendar = ({
    selectedDate,
    setSelectedDate,
    allSchedules,
  }: CalendarProps) => {
    // 이번 달의 모든 일자
    const days = useMemo(() => {
      const start = startOfMonth(selectedDate);
      const end = endOfMonth(selectedDate);
      return eachDayOfInterval({ start, end });
    }, [selectedDate]);
  
    // 특정 날짜 일정 개수
    const getCount = (date: Date) =>
      allSchedules.filter((s) => isSameDay(new Date(s.date), date)).length;
  
    // 점(dot) 렌더링
    const renderDot = (count: number) => {
      if (count === 0) return null;
      if (count >= 5)
        return <div className="w-2 h-2 rounded-full bg-red-500 mx-auto" />;
      return (
        <div className="flex gap-[2px] mt-1">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="w-[4px] h-[4px] rounded-full bg-indigo-500" />
          ))}
        </div>
      );
    };
  
    return (
      <div className="px-4 pt-2">
        {/* 상단: 이전/다음 월 버튼 + 월 */}
        <div className="flex items-center justify-between mb-2 px-2">
          <button
            onClick={() => setSelectedDate(subMonths(selectedDate, 1))}
            className="p-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-50"
          >
            <FaChevronLeft className="text-gray-700" size={18} />
          </button>
          <div className="text-lg font-semibold">
            {format(selectedDate, 'yyyy년 M월', { locale: ko })}
          </div>
          <button
            onClick={() => setSelectedDate(addMonths(selectedDate, 1))}
            className="p-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-50"
          >
            <FaChevronRight className="text-gray-700" size={18} />
          </button>
        </div>
  
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-1">
          {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
  
        {/* 날짜 셀 */}
        <div className="grid grid-cols-7 gap-y-2 text-center">
          {/* 이달의 시작 요일 전 공백 */}
          {Array(getDay(startOfMonth(selectedDate)))
            .fill(null)
            .map((_, i) => (
              <div key={`blank-${i}`} />
            ))}
  
          {days.map((day) => {
            const count = getCount(day);
            const isSel = isSameDay(day, selectedDate);
            return (
              <div
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`relative w-10 h-10 mx-auto flex flex-col items-center justify-center cursor-pointer rounded-full transition
                  ${
                    isSel
                      ? 'bg-indigo-600 text-white'
                      : isToday(day)
                      ? 'border border-indigo-400 text-indigo-600'
                      : 'hover:bg-gray-100'
                  }`}
              >
                <span className="text-sm">{day.getDate()}</span>
                <div className="absolute bottom-1">{renderDot(count)}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default Calendar;  