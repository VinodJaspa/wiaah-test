export function getClosest(positions: number[], target: number) {
  return positions.reduce(function (prev, curr) {
    return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
  }, 0);
}
