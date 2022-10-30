export const waitFor = (
  callback: () => any,
  { interval = 50, timeout = 3000 } = {}
) =>
  new Promise((resolve, reject) => {
    const startTime = Date.now();

    const nextInterval = () => {
      setTimeout(() => {
        try {
          callback();
          resolve(null);
        } catch (err) {
          if (Date.now() - startTime > timeout) {
            reject(`Timed out. ${err}`);
          } else {
            nextInterval();
          }
        }
      }, interval);
    };

    nextInterval();
  });
