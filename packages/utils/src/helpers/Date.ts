import { getTimeInAmPm } from "./getTimeInAmPm";
export function getDate(date: number) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateString = new Date(date).toLocaleDateString("Default", {
    timeZone,
    month: "short",
    weekday: "short",
    day: "numeric",
    year: "numeric",
  });
  return dateString;
}

export function getTime(date: number, eventDurationInMinutes: number) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const toTimestamp = date + eventDurationInMinutes * 60 * 1000;
  return `${getTimeInAmPm(new Date(date), timeZone)} - ${getTimeInAmPm(
    new Date(toTimestamp),
    timeZone
  )}`;
}

const todayDate = new Date();

export const isToday = (date: Date) => {
  return (
    date >
    new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate(),
      0,
      0,
      0
    )
  );
};

export const isYesterday = (date: Date) => {
  return (
    date >
    new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() - 1,
      0,
      0,
      0
    )
  );
};

export const isThisWeek = (date: Date) => {
  return (
    date >
    new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() - todayDate.getDay(),
      0,
      0,
      0
    )
  );
};

export const isThisMonth = (date: Date) => {
  return (
    date > new Date(todayDate.getFullYear(), todayDate.getMonth(), 0, 0, 0, 0)
  );
};
