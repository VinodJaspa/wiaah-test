import React, { useState, useEffect } from "react";
import Subtitle from "../Title/Subtitle";
import { useFormikContext } from "formik";


const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const monthToNumber = (month: string): string => {
  const index = months.indexOf(month);
  return index === -1 ? "01" : String(index + 1).padStart(2, "0");
};

const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

export default function DateOfBirthSelector({
  defaultValue,
  name,
  onChange
}: {
  defaultValue?: { month: string; day: number; year: number };
  onChange?,
  name
}) {
  const [selectedMonth, setSelectedMonth] = useState(defaultValue?.month || "Mar");
  const [selectedDay, setSelectedDay] = useState(defaultValue?.day || 15);
  const [selectedYear, setSelectedYear] = useState(defaultValue?.year || new Date().getFullYear());

  const { setFieldValue } = useFormikContext<any>();

  const updateBirthDate = (month: string, day: number, year: number) => {
    const formattedMonth = monthToNumber(month); // "03"
    const formattedDay = String(day).padStart(2, "0"); // "15"
    const birthDate = `${year}-${formattedMonth}-${formattedDay}`;

    setFieldValue("birthDate", birthDate);
    setFieldValue("birthYear", year.toString());
    setFieldValue("birthMonth", formattedMonth);
    setFieldValue("birthDay", formattedDay);

  };


  useEffect(() => {
    updateBirthDate(selectedMonth, selectedDay, selectedYear);
    const formattedMonth = monthToNumber(selectedMonth); // "03"
    const formattedDay = String(selectedDay).padStart(2, "0"); // "15"
    const birthDate = `${selectedYear}-${formattedMonth}-${formattedDay}`;
    if(onChange){
      onChange(birthDate)

    }
  }, [selectedMonth, selectedDay, selectedYear]);

  const handleSelect = (type: "month" | "day" | "year", value: string | number) => {
    if (type === "month") {
      setSelectedMonth(value as string);
    } else if (type === "day") {
      setSelectedDay(value as number);
    } else if (type === "year") {
      setSelectedYear(value as number);
    }
  };

  return (
    <div className="mt-2 mb-2">
      <Subtitle className="mb-4 block text-sm font-medium text-gray-800">
        Date of birth
      </Subtitle>

      <input
        type="text"
        className="text-sm text-gray-600 mt-2 bg-gray-100 border border-gray-300 rounded px-3 py-2 w-full cursor-not-allowed mb-4"
        value={`${selectedYear}-${monthToNumber(selectedMonth)}-${String(selectedDay).padStart(2, "0")}`}
        readOnly
        disabled
      />


      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="overflow-y-scroll max-h-40 no-scrollbar border rounded">
          {months.map((month) => (
            <div
              key={month}
              onClick={() => handleSelect("month", month)}
              className={`py-2 cursor-pointer rounded ${selectedMonth === month ? "bg-gray-100 font-bold" : "text-gray-500"}`}
            >
              {month}
            </div>
          ))}
        </div>

        <div className="overflow-y-scroll max-h-40 no-scrollbar border rounded">
          {days.map((day) => (
            <div
              key={day}
              onClick={() => handleSelect("day", day)}
              className={`py-2 cursor-pointer rounded ${selectedDay === day ? "bg-gray-100 font-bold" : "text-gray-500"}`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="overflow-y-scroll max-h-40 no-scrollbar border rounded">
          {years.map((year) => (
            <div
              key={year}
              onClick={() => handleSelect("year", year)}
              className={`py-2 cursor-pointer rounded ${selectedYear === year ? "bg-gray-100 font-bold" : "text-gray-500"}`}
            >
              {year}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
