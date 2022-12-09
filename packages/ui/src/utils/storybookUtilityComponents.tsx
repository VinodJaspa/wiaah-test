import React from "react";

export const Counter = () => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <div className="flex items-center gap-4 whitespace-nowrap">
      <button onClick={() => setCount((count) => count - 1)}>decrement</button>
      <span>count: {count}</span>
      <button onClick={() => setCount((count) => count + 1)}>increment</button>
    </div>
  );
};
