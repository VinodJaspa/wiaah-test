import { generateRandomNumber } from "./index";
export const generateVerificationToken = (len: number = 6): string => {
  return [...Array(len)].reduce((acc, curr, i) => {
    const randomNum = generateRandomNumber(9);
    return acc + `${randomNum}`;
  }, "");
};
