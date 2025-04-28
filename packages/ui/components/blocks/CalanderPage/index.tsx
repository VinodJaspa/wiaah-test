import React from "react";
export interface CalanderPageProps {
  date: number | string | Date;
  bgColor?: string;
  textColor?: string;
}

export const CalanderPage: React.FC<CalanderPageProps> = ({
  date,
  bgColor = "#4A4A4A",
  textColor = "#4A4A4A",
}) => {
  const [day, setDay] = React.useState<string>("");
  const [numericDay, setNumericDay] = React.useState<number>();
  const [month, setMonth] = React.useState<string>("");
  React.useEffect(() => {
    const day = new Date(date).toLocaleDateString("Default", {
      weekday: "long",
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
    <div
      style={{
        borderColor: bgColor,
      }}
      className={`flex flex-col border-2 rounded-xl`}
    >
      <div
        style={{
          backgroundColor: bgColor,
        }}
        className={`px-12 py-1 text-center`}
      >
        <span className="text-white">{day.toUpperCase()}</span>
      </div>
      <span className={`text-2xl p-2 font-bold text-[${textColor}]`}>
        <div className="flex flex-col items-center gap-2 py-2">
          <span>{numericDay?.toString() || ""}</span>
          <span>{month}</span>
        </div>
      </span>
    </div>
  );
};
