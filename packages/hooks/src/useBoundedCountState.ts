import React from "react";

export const useBoundedCountState = (
  min: number = -Infinity,
  max: number = Infinity
) => {
  const [count, setCount] = React.useState<number>(0);
  const increment = (by: number = 1) => {
    setCount((state) => {
      const nextRun = state + 1;
      return nextRun > max ? max : nextRun;
    });
  };

  const decrement = (by: number = 1) => {
    setCount((state) => {
      const nextRun = state - 1;
      return nextRun < min ? min : nextRun;
    });
  };
  return {
    increment,
    decrement,
    count,
  };
};
