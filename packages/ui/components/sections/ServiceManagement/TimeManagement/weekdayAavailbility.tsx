import React, { useState } from "react";
import { X, Plus } from "lucide-react";

// Days
const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

// Generate times (every 30 minutes)
const generateTimes = () => {
    const times: string[] = [];
    let hour = 0;
    let minute = 0;

    while (hour < 24) {
        const ampm = hour < 12 ? "AM" : "PM";
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        const displayMinute = minute.toString().padStart(2, "0");
        times.push(`${displayHour}:${displayMinute} ${ampm}`);
        minute += 30;
        if (minute >= 60) {
            minute = 0;
            hour++;
        }
    }
    return times;
};

const timeOptions = generateTimes();

// Convert "09:00 AM" → minutes
const parseTime = (time: string) => {
    const [raw, ampm] = time.split(" ");
    const [h, m] = raw.split(":").map(Number);
    let hour = h % 12;
    if (ampm === "PM") hour += 12;
    return hour * 60 + m;
};

// --------------------
// Reusable TimeRangePicker
// --------------------
interface TimeRangePickerProps {
    value: { from: string; to: string };
    onChange: (newValue: { from: string; to: string }) => void;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ value, onChange }) => {
    const handleChange = (field: "from" | "to", newVal: string) => {
        let updated = { ...value, [field]: newVal };

        // Ensure from < to
        const fromMinutes = parseTime(updated.from);
        const toMinutes = parseTime(updated.to);
        if (fromMinutes >= toMinutes) {
            if (field === "from") {
                const nextIndex = timeOptions.findIndex((t) => t === newVal) + 1;
                updated.to = timeOptions[nextIndex] || "11:59 PM";
            } else {
                const prevIndex = timeOptions.findIndex((t) => t === newVal) - 1;
                updated.from = timeOptions[prevIndex] || "12:00 AM";
            }
        }

        onChange(updated);
    };

    return (
        <div className="flex items-center gap-3 border-t border-grey-300 pb-2 pt-2">
            <select
                value={value.from}
                onChange={(e) => handleChange("from", e.target.value)}
                className="border-none rounded-lg px-2 py-1 text-sm w-full"
            >
                {timeOptions.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </select>
            <span className="text-base font-semibold">-</span>
            <select
                value={value.to}
                onChange={(e) => handleChange("to", e.target.value)}
                className="border-none rounded-lg px-2 py-1 text-sm w-full"
            >
                {timeOptions.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </select>
        </div>
    );
};

// --------------------
// AvailabilityPicker
// --------------------
const AvailabilityPicker = () => {
    const [timeZone, setTimeZone] = useState("Eastern Time");
    const [availability, setAvailability] = useState(
        daysOfWeek.map((day) => ({
            day,
            enabled: false,
            slots: [{ from: "09:00 AM", to: "12:00 PM" }],
        }))
    );

    const handleToggleDay = (index: number) => {
        setAvailability((prev) =>
            prev.map((d, i) => (i === index ? { ...d, enabled: !d.enabled } : d))
        );
    };

    const handleTimeChange = (
        dayIndex: number,
        slotIndex: number,
        newSlot: { from: string; to: string }
    ) => {
        setAvailability((prev) =>
            prev.map((d, i) =>
                i === dayIndex
                    ? {
                        ...d,
                        slots: d.slots.map((s, j) => (j === slotIndex ? newSlot : s)),
                    }
                    : d
            )
        );
    };

    const addSlot = (dayIndex: number) => {
        setAvailability((prev) =>
            prev.map((d, i) =>
                i === dayIndex
                    ? {
                        ...d,
                        slots: [...d.slots, { from: "01:00 PM", to: "05:00 PM" }],
                    }
                    : d
            )
        );
    };

    const removeSlot = (dayIndex: number, slotIndex: number) => {
        setAvailability((prev) =>
            prev.map((d, i) =>
                i === dayIndex
                    ? { ...d, slots: d.slots.filter((_, j) => j !== slotIndex) }
                    : d
            )
        );
    };

    return (
        <div className="space-y-6 mb-6">
            {/* Timezone */}
            <div>
                <label className="block text-sm font-medium">Time zone</label>
                <select
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="mt-1 w-64 border rounded-lg px-3 py-2"
                >
                    <option>Eastern Time</option>
                    <option>Central Time</option>
                    <option>Pacific Time</option>
                    <option>Indian Standard Time</option>
                </select>
            </div>

            <p className="text-gray-600">
                Let people know when you are working and available for meetings.
            </p>

            {/* Static Weekdays Header */}
            <div className="grid grid-cols-[120px_2fr] text-sm font-medium text-gray-700 border-b pb-2">
                <span>Day</span>
                <span>Availability</span>
            </div>

            {/* Days */}
            <div className="space-y-3">
                {availability.map((day, dayIndex) => (
                    <div
                        key={day.day}
                        className={`grid grid-cols-[120px_1fr] items-start border rounded-lg p-4 ${day.enabled ? "bg-white" : "bg-gray-50 opacity-60"
                            }`}
                    >
                        {/* Day Checkbox */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={day.enabled}
                                onChange={() => handleToggleDay(dayIndex)}
                                className="w-5 h-5 text-indigo-600 rounded"
                            />
                            <span className="font-medium">{day.day}</span>
                        </div>

                        {/* Slots Grid */}
                        <div className="flex flex-col gap-3">
                            {day.enabled && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {day.slots.map((slot, slotIndex) => (
                                        <div
                                            key={slotIndex}
                                            className="relative border rounded-lg p-3 bg-white shadow-lg "
                                        >
                                            {/* Header */}
                                            <div className="mb-2">
                                                {/* Labels as header */}
                                                <div className="grid grid-cols-2 gap-4 ml-2">
                                                    <span className="text-xs font-medium text-gray-500 ">From</span>
                                                    <span className="text-xs font-medium text-gray-500 pl-2">To</span>
                                                </div>

                                                {/* Remove button (top-right corner of the card) */}
                                                {day.slots.length > 1 && (
                                                    <button
                                                        onClick={() => removeSlot(dayIndex, slotIndex)}
                                                        className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-600"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                )}
                                            </div>


                                            {/* Time Pickers */}
                                            <TimeRangePicker
                                                value={slot}
                                                onChange={(newSlot) =>
                                                    handleTimeChange(dayIndex, slotIndex, newSlot)
                                                }
                                            />
                                        </div>
                                    ))}

                                    {/* Add Slot Button */}
                                    <button
                                        onClick={() => addSlot(dayIndex)}
                                        className="flex items-center justify-center border-2 border-dashed rounded-lg p-3 text-gray-500 hover:bg-gray-100"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex justify-end gap-3 bg-gray-50 px-6 py-4 border-t rounded-b-lg">
                    {/* Cancel button */}
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    {/* Save button */}
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityPicker;
