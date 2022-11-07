import { SubtractFromDate } from "./subtractFromDate";

jest.useFakeTimers().setSystemTime(new Date(2022, 11, 5, 10, 25));

describe("should subtract from date", () => {
  it("hours", () => {
    const date = new Date();

    const newDate = SubtractFromDate(date, { hours: 4 });

    expect(newDate.toString()).toBe(new Date(2022, 11, 5, 6, 25).toString());
  });

  it("long hours", () => {
    const date = new Date();

    const newDate = SubtractFromDate(date, { hours: 26 });

    expect(newDate.toString()).toBe(new Date(2022, 11, 4, 8, 25).toString());
  });

  it("days", () => {
    const date = new Date();

    const newDate = SubtractFromDate(date, { days: 4 });

    expect(newDate.toString()).toBe(new Date(2022, 11, 1, 10, 25).toString());
  });

  it("long days", () => {
    const date = new Date();

    const newDate = SubtractFromDate(date, { days: 15 });

    expect(newDate.toString()).toBe(new Date(2022, 10, 20, 10, 25).toString());
  });

  it("minutes", () => {
    const date = new Date();

    const newDate = SubtractFromDate(date, { minutes: 4 });

    expect(newDate.toString()).toBe(new Date(2022, 11, 5, 10, 21).toString());
  });

  it("long minutes", () => {
    const date = new Date();

    const newDate = SubtractFromDate(date, { minutes: 30 });

    expect(newDate.toString()).toBe(new Date(2022, 11, 5, 9, 55).toString());
  });
});
