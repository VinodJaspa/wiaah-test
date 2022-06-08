import React, { useMemo } from "react";
import { BiMinus } from "react-icons/bi";
import { BsLayoutSplit } from "react-icons/bs";
import { getClosest, mapTimeRange, TimeMappedType } from "utils";
export type TimeData = {
  from: string;
  to: string;
};
export type Boundings = {
  from: TimeMappedType;
  to: TimeMappedType;
};

export interface TimeSliderProps {
  onTimeChange: (time: TimeData) => any;
  timeRange: string[];
  initialPos: {
    from: number;
    to: number;
  };
  boundings: Boundings;
  onRemove?: () => any;
  onSplit?: (timeRange: Boundings) => any;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({
  onTimeChange,
  timeRange,
  boundings,
  initialPos,
  onRemove,
  onSplit,
}) => {
  let min = 0,
    max = 100;
  const mappedTime = mapTimeRange(timeRange, max, () => {});

  const [minRange, setMinRange] = React.useState<number>(0);
  const [maxRange, setMaxRange] = React.useState<number>(0);
  const [from, setFrom] = React.useState<string>(mappedTime[0]?.time);
  const [to, setTo] = React.useState<string>(
    mappedTime[timeRange.length - 1]?.time
  );
  const [trackStyles, setTrackStyles] = React.useState<React.CSSProperties>({});

  const minPercent = React.useMemo(
    () => (minRange / max) * 100,
    [minRange, max]
  );
  const maxPercent = React.useMemo(
    () => (maxRange / max) * 100,
    [maxRange, max]
  );

  function fillColor() {
    setTrackStyles((state) => ({
      ...state,
      right: `${100 - maxPercent}%`,
      width: `${maxPercent - minPercent}%`,
    }));
  }

  function handleMinChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (Number(e.target.value) > maxRange || Number(e.target.value) < min)
      return;
    const minClosest = getClosest(
      mappedTime.map((time) => time.pos),
      parseInt(e.target.value)
    );
    if (minClosest < boundings.from.pos) return setMinRange(boundings.from.pos);
    if (minClosest === maxRange) return;
    setMinRange(minClosest);
  }

  function handleMaxChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (Number(e.target.value) < minRange || Number(e.target.value) > max)
      return;
    const maxClosest = getClosest(
      mappedTime.map((time) => time.pos),
      parseInt(e.target.value)
    );
    if (maxClosest > boundings.to.pos) return setMaxRange(boundings.to.pos);
    if (maxClosest === minRange) return;
    setMaxRange(maxClosest);
  }

  React.useEffect(() => {
    if (initialPos && initialPos.from && initialPos.to) {
      setMinRange(initialPos.from);
      setMaxRange(initialPos.to);
    }
  }, [initialPos]);

  React.useEffect(() => {
    fillColor();

    const minClosest = getClosest(
      mappedTime.map((time) => time.pos),
      minRange
    );

    if (typeof minClosest === "number") {
      const timeIdx = mappedTime.findIndex((time) => time.pos === minClosest);
      if (timeIdx < 0) return;
      setFrom(mappedTime[timeIdx].time);
    }

    const maxClosest = getClosest(
      mappedTime.map((time) => time.pos),
      maxRange
    );

    if (typeof maxClosest === "number") {
      const timeIdx = mappedTime.findIndex((time) => time.pos === maxClosest);
      if (timeIdx < 0) return;
      setTo(mappedTime[timeIdx].time);
    }

    if (maxRange === minRange) return;
    onTimeChange({
      from: mappedTime[mappedTime.findIndex((time) => time.pos === minRange)]
        .time,
      to: mappedTime[mappedTime.findIndex((time) => time.pos === maxRange)]
        .time,
    });
  }, [minRange, maxRange, initialPos]);

  return (
    <div className="w-full">
      <div className="w-full relative mt-2">
        <span
          style={{
            left: `${minPercent}%`,
          }}
          className="font-bold text-sm whitespace-nowrap absolute bottom-full -translate-x-1/2 mb-8 p-2 shadow-lg bg-slate-50 rounded"
        >
          {from}
        </span>
        <span
          style={{
            left: `${maxPercent}%`,
          }}
          className="font-bold text-sm whitespace-nowrap absolute bottom-full -translate-x-1/2 mb-8 p-2 shadow-lg bg-slate-50 rounded"
        >
          {to}
        </span>
        <span
          style={trackStyles}
          className="flex items-center gap-4 justify-center absolute top-0 right-0 h-2 -translate-y-3/4 rounded-full bg-[#57bf9c] "
        >
          <BsLayoutSplit
            className="cursor-pointer text-2xl p-1 bg-white  rounded text-black"
            onClick={() => onSplit && onSplit(boundings)}
          />
          <BiMinus
            className="cursor-pointer text-2xl p-1 bg-white  rounded text-black"
            onClick={() => onRemove && onRemove()}
          />
        </span>

        <input
          data-test="minRangeInput"
          min={min}
          max={max}
          value={minRange}
          onChange={(e) => handleMinChange(e)}
          className="RangeInput absolute w-full"
          type="range"
        />
        <input
          min={min}
          data-test="maxRangeInput"
          max={max}
          value={maxRange}
          onChange={(e) => handleMaxChange(e)}
          className="RangeInput absolute w-full"
          type="range"
        />
      </div>
    </div>
  );
};
