import React from "react";
export interface CalanderPageProps {
  date: number;
}

export const CalanderPage: React.FC<CalanderPageProps> = ({ date }) => {
  const [day, setDay] = React.useState<string>("");
  const [numericDay, setNumericDay] = React.useState<Number>();
  const [month, setMonth] = React.useState<string>("");
  React.useEffect(() => {
    const day = new Date(date).toLocaleDateString("Default", {
      weekday: "short",
    });
    setDay(day);
    const numericDay = new Date(date).toLocaleDateString("Default", {
      day: "numeric",
    });
    setNumericDay(Number(numericDay));
    const month = new Date(date).toLocaleDateString("Default", {
      month: "long",
    });
    setMonth(month);
  }, []);
  return (
    <div className="flex flex-col border-[1px] border-[#4A4A4A]">
      <div className="px-12 py-1 bg-[#4A4A4A]">
        <span className="text-white">{day.toUpperCase()}</span>
      </div>
      <span className="text-2xl p-2 font-bold text-[#4A4A4A]">
        <div className="flex flex-col items-center gap-2 py-2">
          <span>{numericDay}</span>
          <span>{month}</span>
        </div>
      </span>
    </div>
  );
};
