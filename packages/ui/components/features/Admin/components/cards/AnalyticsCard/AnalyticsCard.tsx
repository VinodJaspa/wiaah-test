import React from "react";
import { randomNum, runIfFn } from "utils";
import { PriceDisplay, ArrowDownIcon, ArrowUpIcon } from "@UI";
import { LineChart, Line } from "recharts";
import { HtmlDivProps } from "types";

export interface AnalyticsCardProps {
  icon: React.ReactNode;
  title: string;
  amount: number;
  percentage: number;
  incress: boolean;
  className?: string;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  amount,
  icon,
  incress,
  percentage,
  title,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const data = [...Array(10)].map((_, i) => ({
    name: "test " + i,
    uv: randomNum(150),
  }));

  return (
    <div
      className={`${
        className || ""
      } w-full h-full grid grid-cols-1 grid-rows-2 rounded px-6 py-4 flex-col gap-8`}
    >
      <div ref={ref} className="flex gap-2 justify-between items-center">
        <span className="text-xl">{runIfFn(icon)}</span>
        <LineChart
          width={(ref.current?.getBoundingClientRect().width || 1) / 2}
          height={ref.current?.getBoundingClientRect().height}
          data={data}
        >
          <Line dataKey={"uv"} type="monotone" stroke="#000" />
        </LineChart>
      </div>
      <div className="flex flex-col gap-1">
        <PriceDisplay decimel className="font-bold text-2xl" price={amount} />
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg ">{title}</p>
          <div className="font-bold text-lg flex items-center gap-1">
            <p>{`${incress ? "+" : "-"}${percentage}%`}</p>
            {incress ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </div>
        </div>
      </div>
    </div>
  );
};
