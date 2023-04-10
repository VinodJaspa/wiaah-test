import { GetDateOfDayInWeekOfMonth } from "./getDateOfWeekInMonth";

jest.useFakeTimers().setSystemTime(new Date(2023, 3, 4));

describe("getDateOfWeekInMonth", () => {
  it("should get all the dates with sunday as the weekday", () => {
    const res = GetDateOfDayInWeekOfMonth(new Date(), 2);

    expect(res.every((v) => v.getDay() === 2)).toBe(true);
  });

  it("should fail", () => {
    const res = GetDateOfDayInWeekOfMonth(new Date(), 2);

    expect(res.every((v) => v.getDay() === 3)).toBe(false);
  });
});
