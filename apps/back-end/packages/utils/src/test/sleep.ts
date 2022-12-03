export function sleep(timeInMs: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, timeInMs);
  });
}
