export function calculateAmountPercentChange(
  amount: number,
  lastAmount: number
): [number, boolean] {
  const percentChange = ((amount - lastAmount) / lastAmount) * 100;
  const isPositive = percentChange >= 0;
  return [Math.abs(percentChange), isPositive];
}
