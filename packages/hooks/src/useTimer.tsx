import React from "react";

let interval: NodeJS.Timeout;
export const useTimer = (
  time: number,
  onTimeProgression: (progress: number) => any,
  speed: number = 200,
  cbOnFinish?: () => any
) => {
  const timeInMs = time * 1000;
  const targetTime = Date.now() + timeInMs;

  if (!interval) {
    interval = setInterval(() => {
      const now = Date.now();
      const diff = targetTime - now;
      const progression = (timeInMs - diff) / timeInMs;
      const progress = Math.round(progression * 100);
      // console.log("timer", progression);
      onTimeProgression(progress);
      if (progression >= 1) {
        clearInterval(interval);
        cbOnFinish && cbOnFinish();
      }
    }, speed);
  } else {
    clearInterval(interval);
    interval = setInterval(() => {
      const now = Date.now();
      const diff = targetTime - now;
      const progression = (timeInMs - diff) / timeInMs;
      const progress = Math.round(progression * 100);
      // console.log("timer", progression);
      onTimeProgression(progress);
      if (progression >= 1) {
        clearInterval(interval);
        cbOnFinish && cbOnFinish();
      }
    }, speed);
  }
};
