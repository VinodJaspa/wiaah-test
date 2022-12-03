import { isWithinTime } from "./isWithinTime";

jest.useFakeTimers().setSystemTime(new Date(2022, 10, 29, 15));

describe("isWithinTime tests", () => {
  it("should return true", () => {
    const fromDate = new Date(2022, 10, 29, 9);
    const toDate = new Date(2022, 10, 29, 19);

    const isWithin = isWithinTime(fromDate, toDate);

    expect(isWithin).toBe(true);
  });

  it("should return false", () => {
    const fromDate = new Date(2022, 10, 29, 7);
    const toDate = new Date(2022, 10, 29, 14);

    const isWithin = isWithinTime(fromDate, toDate);
    expect(isWithin).toBe(false);
  });

  it("should throw error if one of the params is not a date", () => {
    const fromDate = new Date(2022, 10, 29, 9);
    const toDate = new Date(2022, 10, 29, 19);

    let param1Tested = false;

    try {
      //@ts-ignore
      isWithinTime("bad date", toDate);
    } catch {
      param1Tested = true;
    }

    expect(param1Tested).toBe(true);

    let param2Tested = false;

    try {
      //@ts-ignore
      isWithinTime(fromDate, "bad date");
    } catch {
      param2Tested = true;
    }

    expect(param2Tested).toBe(true);
  });
});
