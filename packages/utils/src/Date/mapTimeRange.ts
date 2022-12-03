export type TimeMappedType = { pos: number; time: string };

export function mapTimeRange(
  timeRanges: string[],
  max: number = 100,
  cb?: (res: TimeMappedType[]) => any
): TimeMappedType[] {
  const itemsGap = max / timeRanges.length;

  const mappedTime: TimeMappedType[] = timeRanges.map((time, idx) => {
    const isLast = idx === timeRanges.length - 1;
    return {
      pos: isLast ? max : idx * itemsGap,
      time,
    };
  });
  cb && cb(mappedTime);
  return mappedTime;
}
