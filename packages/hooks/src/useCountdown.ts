import { useEffect, useState, useRef } from "react";

export const useSecondsCountdown = (
  targetDate: Date,
  check: (count: number) => boolean
) => {
  const countDownDate = new Date(targetDate).getTime();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const newCount = countDownDate - new Date().getTime();
      const valid = check(newCount);
      if (valid) {
        setCountDown(newCount);
      } else {
        clearInterval(intervalRef.current);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const seconds = Math.floor(countDown / 1000);

  return seconds;
};
