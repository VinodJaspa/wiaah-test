import { useEffect } from "react";

export const useTimer = (
  time: number,
  onTimeProgression: (progress: number) => void,
  speed: number = 200,
  cbOnFinish?: () => void
) => {
  useEffect(() => {
    const timeInMs = time * 1000;
    const targetTime = Date.now() + timeInMs;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetTime - now;
      const progression = (timeInMs - diff) / timeInMs;
      const progress = Math.round(progression * 100);
      onTimeProgression(progress);

      if (progression >= 1) {
        clearInterval(interval);
        cbOnFinish && cbOnFinish();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [time, onTimeProgression, speed, cbOnFinish]);
};
