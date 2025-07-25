import { addMonths, format } from "date-fns";
import { useField, useFormikContext } from "formik";
import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface DatePickerFieldProps {
  name: string;
  label?: string;
}

export default function DatePickerField({ name, label = "Shipping Time" }: DatePickerFieldProps) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const handlePrevMonth = () => setCurrentMonth((prev) => addMonths(prev, -1));
  const handleNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));
  return (
    <div className="space-y-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-800">
        {label}
      </label>

      <input
        id={name}
        readOnly
        value={field.value ? format(new Date(field.value), "dd/MM/yyyy") : ""}
        placeholder="dd/mm/yyyy"
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-white cursor-pointer"
      />
       {meta.touched && meta.error && (
          <p className="text-sm text-red-600">{meta.error}</p>
        )}

      {/* <div className="rounded-md border border-gray-200 shadow-sm p-4">
        <DayPicker
          mode="single"
          selected={field.value ? new Date(field.value) : undefined}
          onSelect={(date) => setFieldValue(name, date?.toISOString())}
          classNames={{
            caption: "flex justify-between items-center font-semibold text-sm text-black mb-4",
            nav: "flex items-center justify-between w-full",
            nav_button: "text-black hover:text-gray-600 text-lg",
            nav_button_previous: "text-xl px-2",
            nav_button_next: "text-xl px-2",
            month: "space-y-2 w-full",
            table: "w-full border-collapse",
            head_row: "flex w-full justify-between",
            head_cell: "text-xs text-gray-500 font-medium w-8 text-center",
            row: "flex w-full justify-between",
            cell: "text-sm w-8 h-8 text-center hover:bg-gray-100 rounded-full cursor-pointer",
            day_selected: "bg-black text-white rounded-full",
            day_today: "font-semibold text-black",
          }}
        />
      </div> */}
      <div className="w-full border border-gray-200 rounded-md mt-2 p-4">
        <div className="space-y-4">
          <div className="">
            {/* Header with arrows and month */}
            <div className="flex items-center justify-between mb-4 px-2">
              <button
               onClick={(e) => {
                e.preventDefault();
                handlePrevMonth();
              }}
                className="text-gray-600 hover:text-black p-1 rounded transition-transform hover:scale-110"
              >
                <AiOutlineLeft className="text-xl" />
              </button>
              <span className="text-sm font-semibold text-gray-800">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNextMonth();
                }}
                
                className="text-gray-600 hover:text-black p-1 rounded transition-transform hover:scale-110"
              >
                <AiOutlineRight className="text-xl" />
              </button>
            </div>

            {/* Day Picker */}
            <DayPicker
              mode="single"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) => setFieldValue(name, date?.toISOString())}
              month={currentMonth}
              showOutsideDays
              classNames={{
                table: "w-full border-separate border-spacing-y-1",
                head_row: "flex justify-between",
                head_cell: "text-xs text-gray-400 w-8 text-center",
                row: "flex justify-between",
                cell: "w-8 h-8 text-sm text-center text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer",
                day_selected: "bg-black text-white font-medium rounded-full",
                day_today: "font-semibold border-b bg-black  text-white rounded-full",
              }}
            />
          </div>
        </div>
       
      </div>

    </div>
  );
}
