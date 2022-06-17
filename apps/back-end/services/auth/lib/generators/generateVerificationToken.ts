import { generateRandomNumber } from '@lib';
export const generateVerificationToken = (): string => {
  return [...Array(6)].reduce((acc, curr, i) => {
    const randomNum = generateRandomNumber(9);
    return acc + `${randomNum}`;
  }, '');
};
