export const useTimeDuration = (timeInSec: number) => {
  const second = 1,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  const hours = Math.floor(timeInSec / hour);
  const minutes = Math.floor(timeInSec / minute);
  const seconds = Math.floor(timeInSec % minute);

  return {
    hours,
    minutes,
    seconds,
  };
};
