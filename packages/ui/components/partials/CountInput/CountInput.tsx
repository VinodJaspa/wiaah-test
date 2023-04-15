import React from "react";
import { useBoundedCountState } from "hooks";
import { MinusIcon, RoundedPlusIcon } from "@UI";
import { setTestid } from "utils";

export interface CountInputProps {
  onCountChange?: (count: number) => any;
  count?: number;
  min?: number;
  max?: number;
  label?: string;
  errors?: string[];
}
export const CountInput: React.FC<CountInputProps> = ({
  onCountChange,
  max,
  min = 0,
  count: controlledCount,
}) => {
  const { count, decrement, increment, setCount } = useBoundedCountState(
    min,
    max
  );

  React.useEffect(() => {
    if (typeof controlledCount === "number" && controlledCount !== count) {
      setCount(controlledCount);
    }
  }, [controlledCount]);

  React.useEffect(() => {
    onCountChange && onCountChange(count);
  }, [count]);

  return (
    <div className="whitespace-nowrap flex items-center gap-1">
      <MinusIcon
        {...setTestid("DecrementCountBtn")}
        className={`${count === min ? "opacity-50" : ""} cursor-pointer`}
        onClick={() => decrement()}
      />
      <p className="w-10 select-none text-center whitespace-nowrap">{count}</p>
      <RoundedPlusIcon
        {...setTestid("IncrementCountBtn")}
        className={`${
          count === max ? "opacity-50" : "border-black"
        } cursor-pointer`}
        onClick={() => increment()}
      />
    </div>
  );
};
