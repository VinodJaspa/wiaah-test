import { useState } from "react";
import { format, addMonths } from "date-fns";
import {
    DayPicker,
    DateRange,
    SelectRangeEventHandler,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function TwoMonthRangePicker({
    range,
    onRangeChange,
}: {
    range: [Date | null, Date | null];
    onRangeChange: (range: [Date | null, Date | null]) => void;
}) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handlePrevMonth = () => setCurrentMonth((prev) => addMonths(prev, -1));
    const handleNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));

    const handleRangeChange: SelectRangeEventHandler = (selectedRange) => {
        if (!selectedRange) return;
        onRangeChange([selectedRange.from ?? null, selectedRange.to ?? null]);
    };

    return (
        <div className="space-y-4">
          
            <div className="flex border rounded-lg p-4 gap-8 overflow-x-auto">

                {/* Month 1 */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                      
                        <button
                   onClick={handlePrevMonth}
                            className="text-gray-500 hover:text-blue-500 px-2 py-1 text-lg transition-all duration-200 transform hover:scale-110"
                        >
                            <AiOutlineLeft className="text-xl" />
                        </button>
                        <span className="text-sm font-medium text-gray-700">
                            {format(currentMonth, "MMMM yyyy")}
                        </span>
                        <div className="w-6" /> {/* spacer to balance */}
                    </div>
                    <DayPicker
                        mode="range"
                        selected={{ from: range[0]!, to: range[1]! }}
                        onSelect={handleRangeChange}
                        month={currentMonth}
                        showOutsideDays
                        classNames={{
                            table: "w-full border-separate border-spacing-y-1",
                            head_cell: "w-8 text-xs text-gray-400 text-center d-none",
                            cell: "w-8 h-8 text-sm text-center text-gray-700 hover:bg-gray-100 rounded-full",
                            day_selected: "bg-blue-100 text-black font-semibold",
                            day_range_start: "bg-blue-200 rounded-l-full",
                            day_range_end: "bg-blue-200 rounded-r-full",
                            day_range_middle: "bg-blue-100",
                        }}
                    />
                </div>

                {/* Month 2 */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-6" /> {/* spacer to balance */}
                        <span className="text-sm font-medium text-gray-700">
                            {format(addMonths(currentMonth, 1), "MMMM yyyy")}
                        </span>
                        <button
                            onClick={handleNextMonth}
                            className="text-gray-500 hover:text-blue-500 px-2 py-1 text-lg transition-all duration-200 transform hover:scale-110"
                        >
                            <AiOutlineRight className="text-xl" />
                        </button>

                    </div>
                    <DayPicker
                        mode="range"
                        selected={{ from: range[0]!, to: range[1]! }}
                        onSelect={handleRangeChange}
                        month={addMonths(currentMonth, 1)}
                        showOutsideDays
                        classNames={{
                            table: "w-full border-separate border-spacing-y-1",
                            head_cell: "w-8 text-xs text-gray-400 text-center",
                            cell: "w-8 h-8 text-sm text-center text-gray-700 hover:bg-gray-100 rounded-full",
                            day_selected: "bg-blue-100 text-black font-semibold",
                            day_range_start: "bg-blue-200 rounded-l-full",
                            day_range_end: "bg-blue-200 rounded-r-full",
                            day_range_middle: "bg-blue-100",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
