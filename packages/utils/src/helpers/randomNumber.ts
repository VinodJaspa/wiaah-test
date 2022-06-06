export const randomNum = (max: number) => Math.floor(Math.random() * max);
export const randomNumWithNegative = (max: number) => {
  const ranNum = randomNum(10);
  const randomNumber = randomNum(max);
  const isNegetive = ranNum % 2 === 0;
  return isNegetive ? -Math.abs(randomNumber) : Math.abs(randomNumber);
};
