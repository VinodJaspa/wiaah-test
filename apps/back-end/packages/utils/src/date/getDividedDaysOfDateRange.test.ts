import { getDatesInRangeDays } from "./getDividedDaysOfDateRange";

jest.useFakeTimers().setSystemTime(new Date(2023, 3, 15, 0));

describe("test", () => {
  it("should get the right dates", () => {
    const from = new Date(2023, 3, 16, 12);
    const to = new Date(2023, 3, 20, 11);

    const diff = getDatesInRangeDays(from, to);

    expect(diff.length).toBe(4);
    expect(diff.at(0).getDate()).toBe(16);
    expect(diff.at(1).getDate()).toBe(17);
    expect(diff.at(2).getDate()).toBe(18);
    expect(diff.at(3).getDate()).toBe(19);
  });
});
