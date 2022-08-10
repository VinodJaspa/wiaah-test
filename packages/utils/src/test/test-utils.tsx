import { act } from "react-dom/test-utils";

export function setTestid(id: string): object {
  return { "data-testid": id };
}

export function getTestId(id: string): string {
  return `[data-testid="${id}"]`;
}
export function getRoleId(id: string): string {
  return `[role='${id}']`;
}

export function containsClassName(
  className: string,
  findClassName: string
): boolean {
  const findIdx = className.indexOf(findClassName);
  const findLeng = findClassName.length;
  const letterBefore = findIdx < 1 ? undefined : className.at(findIdx - 1);
  const letterAfter = className.at(findIdx + findLeng);

  const beforeCheck =
    typeof letterBefore === "undefined" || letterBefore === " ";
  const afterCheck = typeof letterAfter === "undefined" || letterAfter === " ";

  return beforeCheck && afterCheck;
}

export const waitFor = (
  callback: () => any,
  { interval = 50, timeout = 3000 } = {}
) =>
  act(
    () =>
      new Promise((resolve, reject) => {
        const startTime = Date.now();

        const nextInterval = () => {
          setTimeout(() => {
            try {
              callback();
              resolve();
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
      })
  );
