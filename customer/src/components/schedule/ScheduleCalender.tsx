import { Calendar } from "@/components/ui/calendar"
import { ko } from "date-fns/locale"

interface ScheduleCalenderProps {
    selectedDate: Date | undefined;
    onDateSelect: (date: Date | undefined) => void;
}

export const ScheduleCalender = ({ selectedDate, onDateSelect }: ScheduleCalenderProps) =>{
    return (
    <div className="mb-6 flex flex-col items-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          locale={ko}
          className="p-0"
          classNames={{
            months: "space-y-4 mx-auto",
            month: "space-y-4",
            caption: "flex items-center pt-1 relative",
            caption_label: "text-lg font-medium",
            nav: "absolute right-1 flex gap-1",
            nav_button: "h-9 w-9 bg-gray-200 rounded-full hover:bg-gray-200 text-gray-500 hover:text-white",
            nav_button_previous: "",
            nav_button_next: "",
            table: "w-full border-collapse",
            head_row: "flex w-full gap-[2px]",
            head_cell: "text-gray-500 w-[49px] h-[49px] flex items-center justify-center font-normal text-sm",
            row: "flex w-full mt-[2px] gap-[2px]",
            cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
            day: "h-[49px] w-[49px] p-0 font-normal aria-selected:opacity-100 rounded-full flex items-center justify-center transition-colors hover:text-white hover:bg-primary bg-gray-200 text-black ",
            day_range_end: "day-range-end",
            day_selected: "bg-primary text-white hover:bg-[#6366F1] focus:bg-[#6366F1] text-white focus:text-white",
            day_today: "bg-gray-100 text-black",
            day_outside: "text-gray-1000 opacity-30 bg-white text-black",
            day_disabled: "text-gray-1000 cursor-not-allowed bg-white text-black opacity-30",
            day_hidden: "invisible"
          }}
          disabled={(date) => date < new Date()}
        />
      </div>
    )
}