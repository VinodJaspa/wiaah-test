import { ServiceDailyPrices } from 'prismaClient';

export const Weekdays: Record<number, keyof ServiceDailyPrices> = {
  0: 'mo',
  1: 'tu',
  2: 'we',
  3: 'th',
  4: 'fr',
  5: 'sa',
  6: 'su',
};
