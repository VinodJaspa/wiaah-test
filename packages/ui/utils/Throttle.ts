export function throttle(cb: () => {}, delay = 1000) {
  let shouldWait = false;
  let waitingArgs: any;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb();
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return () => {
    if (shouldWait) {
      return;
    }

    cb();
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}
