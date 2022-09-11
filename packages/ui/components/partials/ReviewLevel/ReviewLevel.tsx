import React from "react";

export type ReviewLevelData = {
  rate: number;
  name: string;
};

export interface ReviewLevelProps extends ReviewLevelData {}

export const ReviewLevel: React.FC<ReviewLevelProps> = ({
  name,
  rate: _rate,
}) => {
  const rate = _rate > 5 ? 5 : _rate < 0 ? 0 : _rate;
  const ratePercent = (rate / 5) * 100;
  return (
    <div className="flex items-center gap-2 justify-between w-full">
      <p className="text-sm font-medium text-lightBlack">{name}</p>
      <div className="flex items-center w-1/2 gap-2">
        <div className="relative w-full rounded-full h-[0.188rem] bg-gray-400">
          <span
            style={{
              width: `${ratePercent}%`,
            }}
            className={`top-0 left-0 absolute rounded-full h-full bg-primary`}
          />
        </div>
        <p className="font-semibold text-title text-sm">{rate.toFixed(1)}</p>
      </div>
    </div>
  );
};
