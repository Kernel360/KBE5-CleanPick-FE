import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ScheduleTimeProps {
  selectedHour: string;
  selectedMinute: string;
  onHourSelect: (hour: string) => void;
  onMinuteSelect: (minute: string) => void;
}

export const ScheduleTime = ({ 
  selectedHour,
  selectedMinute,
  onHourSelect,
  onMinuteSelect 
}: ScheduleTimeProps) => {
  // 시간 옵션 생성 (07:00 ~ 20:00)
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i + 1;
    return hour.toString().padStart(2, '0');
  });

  // 10분 단위 옵션 생성 (00, 10, 20, 30, 40, 50)
  const minutes = Array.from({ length: 6 }, (_, i) => {
    return (i * 10).toString().padStart(2, '0');
  });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">시간 선택하기</h3>
      <div className="flex gap-3">
        <Select value={selectedHour} onValueChange={onHourSelect}>
          <SelectTrigger className="flex-1 h-12 px-4 bg-gray-100 border-0 rounded-xl hover:bg-gray-200 transition-colors data-[state=open]:text-black data-[state=closed]:text-black">
            <SelectValue placeholder="시간" className="text-gray-400 [&[data-value]]:text-black" />
          </SelectTrigger>
          <SelectContent 
            className="rounded-lg border-0 shadow-lg bg-white w-full min-w-[120px]" 
            position="popper"
            side="bottom"
            align="start"
            sideOffset={4}
            style={{ zIndex: 50 }}
          >
            <div className="max-h-[280px] overflow-y-auto">
              {hours.map((hour) => (
                <SelectItem 
                  key={hour} 
                  value={hour}
                  className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer py-2.5"
                >
                  {hour}시
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
        <Select value={selectedMinute} onValueChange={onMinuteSelect}>
          <SelectTrigger className="flex-1 h-12 px-4 bg-gray-100 border-0 rounded-xl hover:bg-gray-200 transition-colors data-[state=open]:text-black data-[state=closed]:text-black">
            <SelectValue placeholder="분" className="text-gray-400 [&[data-value]]:text-black" />
          </SelectTrigger>
          <SelectContent 
            className="rounded-lg border-0 shadow-lg bg-white w-full min-w-[120px]" 
            position="popper"
            side="bottom"
            align="start"
            sideOffset={4}
            style={{ zIndex: 50 }}
          >
            <div className="max-h-[280px] overflow-y-auto">
              {minutes.map((minute) => (
                <SelectItem 
                  key={minute} 
                  value={minute}
                  className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer py-2.5"
                >
                  {minute}분
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}; 