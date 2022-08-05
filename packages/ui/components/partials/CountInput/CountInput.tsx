import React from "react";
import { useBoundedCountState } from "hooks";
import { MinusIcon, PlusIcon } from "ui";

export interface CountInputProps {
  onCountChange: (count: number) => any;
  min?: number;
  max?: number;
}
export const CountInput: React.FC<CountInputProps> = ({
  onCountChange,
  max,
  min,
}) => {
  const { count, decrement, increment } = useBoundedCountState(min, max);

  React.useEffect(() => {
    onCountChange && onCountChange(count);
  }, [count]);

  return (
    <div className="whitespace-nowrap flex items-center gap-1">
      <MinusIcon
        className={`${count === min ? "opacity-50" : ""}`}
        onClick={() => decrement()}
      />
      <p className="w-10 select-none text-center whitespace-nowrap">{count}</p>
      <PlusIcon
        className={`${count === max ? "opacity-50" : ""}`}
        onClick={() => increment()}
      />
    </div>
  );
};
