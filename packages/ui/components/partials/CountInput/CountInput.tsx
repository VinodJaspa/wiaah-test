import React from "react";
import { useBoundedCountState } from "hooks";
import { MinusIcon, PlusIcon } from "ui";
import { setTestid } from "utils";

export interface CountInputProps {
  onCountChange?: (count: number) => any;
  count?: number;
  min?: number;
  max?: number;
}
export const CountInput: React.FC<CountInputProps> = ({
  onCountChange,
  max,
  min,
  count: controlledCount,
}) => {
  const { count, decrement, increment, setCount } = useBoundedCountState(
    min,
    max
  );

  React.useEffect(() => {
    if (typeof controlledCount === "number") {
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
        className={`${count === min ? "opacity-50" : ""}`}
        onClick={() => decrement()}
      />
      <p className="w-10 select-none text-center whitespace-nowrap">{count}</p>
      <PlusIcon
        {...setTestid("IncrementCountBtn")}
        className={`${count === max ? "opacity-50" : ""}`}
        onClick={() => increment()}
      />
    </div>
  );
};
