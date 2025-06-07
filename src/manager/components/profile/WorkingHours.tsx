import React from 'react';
import { Plus, ChevronDown } from 'lucide-react';

interface WorkingDay {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface WorkingHoursProps {
  workingDays: WorkingDay[];
  onWorkingDaysChange: (days: WorkingDay[]) => void;
}

const DAYS_OF_WEEK = [
  { value: 'MONDAY', label: '월요일' },
  { value: 'TUESDAY', label: '화요일' },
  { value: 'WEDNESDAY', label: '수요일' },
  { value: 'THURSDAY', label: '목요일' },
  { value: 'FRIDAY', label: '금요일' },
  { value: 'SATURDAY', label: '토요일' },
  { value: 'SUNDAY', label: '일요일' }
];

const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

export default function WorkingHours({ workingDays, onWorkingDaysChange }: WorkingHoursProps) {
  const addNewDay = () => {
    const usedDays = workingDays.map(day => day.day);
    const availableDay = DAYS_OF_WEEK.find(day => !usedDays.includes(day.value));
    
    if (availableDay) {
      const newDay: WorkingDay = {
        id: Date.now().toString(),
        day: availableDay.value,
        startTime: '09:00',
        endTime: '18:00'
      };
      onWorkingDaysChange([...workingDays, newDay]);
    }
  };

  const removeDay = (dayId: string) => {
    onWorkingDaysChange(workingDays.filter(day => day.id !== dayId));
  };

  const updateDay = (dayId: string, field: keyof WorkingDay, value: string) => {
    onWorkingDaysChange(workingDays.map(day => 
      day.id === dayId ? { ...day, [field]: value } : day
    ));
  };

  const getDayLabel = (dayValue: string) => {
    return DAYS_OF_WEEK.find(day => day.value === dayValue)?.label || dayValue;
  };

  const getAvailableDays = (currentDayValue: string) => {
    const usedDays = workingDays.map(day => day.day).filter(day => day !== currentDayValue);
    return DAYS_OF_WEEK.filter(day => !usedDays.includes(day.value));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">활동 가능 시간</p>
        <button
          type="button"
          onClick={addNewDay}
          disabled={workingDays.length >= 7}
          className="bg-white flex items-center px-4 py-2 text-primary text-sm font-medium "
        >
          <Plus className="w-4 h-4 mr-1.5" />
          요일 추가
        </button>
      </div>

      <div className="space-y-3 ">
        {workingDays.map((workingDay) => (
          <div key={workingDay.id} className="flex items-center space-x-3">
            <div className="relative flex-1 min-w-[100px]">
              <select
                value={workingDay.day}
                onChange={(e) => updateDay(workingDay.id, 'day', e.target.value)}
                className="w-full pl-4 pr-7 py-3 text-sm font-medium border border-gray-300 rounded-lg appearance-none bg-white hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                {getAvailableDays(workingDay.day).map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative flex-1 min-w-[80px]">
              <select
                value={workingDay.startTime}
                onChange={(e) => updateDay(workingDay.id, 'startTime', e.target.value)}
                className="w-full pl-4 pr-7 py-3 text-sm font-medium border border-gray-300 rounded-lg appearance-none bg-white hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>

            <span className="text-gray-400 font-bold">~</span>

            <div className="relative flex-1 min-w-[80px]">
              <select
                value={workingDay.endTime}
                onChange={(e) => updateDay(workingDay.id, 'endTime', e.target.value)}
                className="w-full pl-4 pr-7 py-3 text-sm font-medium border border-gray-300 rounded-lg appearance-none bg-white hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={() => removeDay(workingDay.id)}
              className="bg-white flex items-center justify-center w-10 h-10 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <span className="text-lg font-bold">×</span>
            </button>
          </div>
        ))}

      </div>
    </div>
  );
} 