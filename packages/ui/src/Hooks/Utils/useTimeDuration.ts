export const useTimeDuration = (timeInSec: number) => {
  const second = 1,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let hours = Math.floor(timeInSec / hour);
  let minutes = Math.floor(timeInSec / minute);
  let seconds = Math.floor(timeInSec % minute);

  return {
    hours,
    minutes,
    seconds,
  };
};
