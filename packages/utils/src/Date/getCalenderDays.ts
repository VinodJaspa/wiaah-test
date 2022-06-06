export type WeekDays = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export const weekDays: WeekDays[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export interface FormatedDays {
  dayNum: number;
  currentMonth: boolean;
}

export const getDividedWeeks = (days: FormatedDays[]) => {
  let array: FormatedDays[][] = [];
  let currentPhase = 0;
  while (currentPhase * 7 < days.length) {
    const sliced = [...days.slice(currentPhase * 7, (currentPhase + 1) * 7)];
    array.push(sliced);
    currentPhase++;
  }
  return array;
};
export function getMonthDays(monthIdx: number, year: number): FormatedDays[] {
  const lastMonthYear = monthIdx <= 0 ? year - 1 : year;
  const lastMonthIdx = monthIdx <= 0 ? 12 : monthIdx;

  const CurrentMonthFirstDay = new Date(
    Date.UTC(year, monthIdx)
  ).toLocaleDateString("en", { weekday: "short" });

  const lastMonthDays = new Date(
    Date.UTC(lastMonthYear, lastMonthIdx, -0)
  ).getDate();
  const currentMonthDays = new Date(Date.UTC(year, monthIdx, -0)).getDate();

  const firstDayIdxInTheWeek = weekDays.findIndex(
    (day) => day === CurrentMonthFirstDay
  );
  const lastDayIdxInThe = weekDays.findIndex(
    (day) => day === CurrentMonthFirstDay
  );

  let lastMonthLastDays: FormatedDays[] = [];
  let currentMonthFormatedDays: FormatedDays[] = [];

  for (let i = 1; i <= currentMonthDays; i++) {
    currentMonthFormatedDays.push({
      dayNum: i,
      currentMonth: true,
    });
  }

  for (let i = 0; i < firstDayIdxInTheWeek; i++) {
    lastMonthLastDays.unshift({
      dayNum: lastMonthDays - i,
      currentMonth: false,
    });
  }

  const lastAndCurrentDays = lastMonthLastDays.concat(currentMonthFormatedDays);
  let reminingFormatedDays: FormatedDays[] = [];
  const reminingDays = (lastAndCurrentDays.length % 7) - 7;

  for (let i = 1; i <= Math.abs(reminingDays); i++) {
    reminingFormatedDays.push({
      dayNum: i,
      currentMonth: false,
    });
  }
  const all = lastAndCurrentDays.concat(reminingFormatedDays);

  return all;
}

export type HistoryMonth = {
  monthName: string;
  monthIdx: number;
  year: number;
};

export function getHistoryMonths(): HistoryMonth[] {
  const months: HistoryMonth[] = [];
  let year: number = parseInt(
    new Date(Date.now()).toLocaleDateString("en-us", { year: "numeric" })
  );
  let monthIdx: number = new Date(Date.now()).getMonth();

  function addMonth(year: number, monthIdx: number) {
    const date = new Date(Date.UTC(year, monthIdx));
    const Year = new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
    });
    const month = new Date(date).toLocaleDateString("en-us", {
      month: "short",
    });
    months.push({ year: parseInt(Year), monthName: month, monthIdx });
  }

  for (let i = 0; i < 50; i++) {
    addMonth(year, monthIdx);
    if (monthIdx - 1 < 0) {
      year--;
      monthIdx = 11;
    } else {
      monthIdx--;
    }
  }
  return months;
}
