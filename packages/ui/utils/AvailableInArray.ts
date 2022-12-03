export function AvailableInArray<T>(target: T, array: T[]): boolean {
  const index = array.findIndex((element) => element === target);
  return index > -1;
}

export function isAllAvailableInArray<T>(targets: T[], array: T[]): boolean {
  return targets.every((target) => {
    const idx = array.findIndex((item) => item === target);
    return idx > -1;
  });
}

export function ToggleInArray<T>(array: T[], boolean: boolean, value: T): T[] {
  if (boolean) {
    const clearedArray = array.filter((item) => item !== value);
    return [...clearedArray, value];
  } else {
    return array.filter((item) => item !== value);
  }
}
