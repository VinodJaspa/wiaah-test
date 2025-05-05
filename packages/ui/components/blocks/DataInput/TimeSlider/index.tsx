import { useOutsideClick } from "hooks";
import React from "react";
import { BiMinus } from "react-icons/bi";
import { BsLayoutSplit } from "react-icons/bs";
import { AddToDate, getClosest, mapTimeRange, TimeMappedType } from "utils";
export type TimeData = {
  from: string;
  to: string;
};
export type Boundings = {
  from: TimeMappedType;
  to: TimeMappedType;
};
export type PosBoundings = {
  from: number;
  to: number;
};
export interface TimeSliderProps {
  onChange: (time: [Date, Date]) => any;
  value: [Date, Date];
  onRemove?: () => any;
  onSplit?: (timeRange: Boundings) => any;
  onActive?: (borders: PosBoundings) => any;
}

function getDateRanges(start: Date, end: Date, mins: number = 30): Date[] {
  let current = new Date(start);
  const result: Date[] = [current];
  while (current <= end) {
    const next = new Date(current);
    next.setMinutes(next.getMinutes() + 30);
    result.push(next);
    current = next;
  }
  return result;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({
  onChange,
  value,
  onRemove,
  onSplit,
  onActive,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState<boolean>();
  useOutsideClick(ref, () => setActive(false));
  const min = 0,
    max = 100;

  const timeRange = getDateRanges(value[0], value[1]);

  const mappedTime = mapTimeRange(
    timeRange.map((d) => `${d.getHours()}:${d.getMinutes()}`),
    max,
    () => {}
  );

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

    if (minClosest === maxRange) return;
    if (minClosest === minRange) return;
    if (maxRange === minRange) return;
    setMinRange(minClosest);
  }

  function handleMaxChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (Number(e.target.value) < minRange || Number(e.target.value) > max)
      return;
    const maxClosest = getClosest(
      mappedTime.map((time) => time.pos),
      parseInt(e.target.value)
    );
    if (maxClosest === minRange) return;
    if (maxClosest === maxRange) return;
    setMaxRange(maxClosest);
  }

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
    if (!active) return;
    onChange([
      timeRange[mappedTime.findIndex((time) => time.pos === minRange)],
      timeRange[mappedTime.findIndex((time) => time.pos === maxRange)],
    ]);
  }, [minRange, maxRange]);

  return (
    <div ref={ref} onFocus={() => setActive(true)} className="w-full">
      <div className="w-full relative mt-2">
        <span
          style={{
            left: `${minPercent}%`,
          }}
          className={`${
            active ? "text-primary" : "text-black"
          } font-bold text-sm whitespace-nowrap absolute bottom-full -translate-x-1/2 mb-8 p-2 shadow-lg bg-slate-50 rounded`}
        >
          {from}
        </span>
        <span
          style={{
            left: `${maxPercent}%`,
          }}
          className={`${
            active ? "text-primary" : "text-black"
          } font-bold text-sm whitespace-nowrap absolute bottom-full -translate-x-1/2 mb-8 p-2 shadow-lg bg-slate-50 rounded`}
        >
          {to}
        </span>
        <span
          style={trackStyles}
          className="flex items-center gap-4 justify-center absolute top-0 right-0 h-2 -translate-y-3/4 rounded-full bg-[#57bf9c] "
        >
          <BsLayoutSplit
            className="cursor-pointer text-2xl p-1 bg-white  rounded text-black"
            onClick={() => {}}
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
interface TimeSliderControllerProps {
  timeRange: string[];
  value: Date[];
  onChange: (timeRanges: Date[]) => any;
  openRanges: TimeData[];
  activeRange?: number;
  onActiveRange?: (bordersIdx: number[]) => any;
}

export const TimeSliderController: React.FC<TimeSliderControllerProps> = ({
  timeRange = [],
  openRanges,
  onChange,
  value,
  onActiveRange,
}) => {
  const [ranges, setRanges] = React.useState<Boundings[]>([]);
  const [mappedTime, setMappedTime] = React.useState<TimeMappedType[]>([]);

  React.useEffect(() => {
    const boundings: Boundings[] = [];
    openRanges.map((range, i) => {
      const fromRangeIdx = timeRange.findIndex((time) => time === range.from);
      const toRangeIdx = timeRange.findIndex((time) => time === range.to);
      boundings.push({
        from: mappedTime[fromRangeIdx],
        to: mappedTime[toRangeIdx],
      });
    });
    setRanges(boundings);
  }, [openRanges, mappedTime]);

  React.useEffect(() => {
    mapTimeRange(timeRange, undefined, (res) => setMappedTime(res));
  }, [timeRange]);
  return (
    <div className="w-full relative">
      {ranges.map((range, i) => {
        const first = new Date(new Date().setHours(0));

        return (
          <div
            key={i}
            className="absolute pointer-events-none top-0 left-0 w-full -translate-y-1/2"
          >
            <TimeSlider
              value={[first, AddToDate(first, { days: 1 })]}
              onChange={onChange}
              onSplit={(range) => {}}
            />
          </div>
        );
      })}
    </div>
  );
};
