import { getTimeInAmPm } from "./getTimeInAmPm";
export function getDate(date: number) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateString = new Date(date).toLocaleDateString("Default", {
    timeZone,
    month: "narrow",
    weekday: "narrow",
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
