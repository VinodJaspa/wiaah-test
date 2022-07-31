export const CalculateVat = (price: number, vatPercent: number) => {
  return (vatPercent / 100) * price;
};
