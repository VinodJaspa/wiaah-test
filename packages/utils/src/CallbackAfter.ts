let callbackTimeout: NodeJS.Timer | undefined;

export const CallbackAfter = (timeInMs: number = 1000, callback: Function) => {
  if (callbackTimeout) {
    clearTimeout(callbackTimeout);
    callAfter(timeInMs, callback);
  } else {
    callAfter(timeInMs, callback);
  }
};

function callAfter(ms: number, callback: Function) {
  callbackTimeout = setTimeout(() => {
    callback();
    callbackTimeout = undefined;
  }, ms);
}
