export function getTimeInAmPm(d: Date, timeZone?: string) {
  const date = timeZone
    ? d.toLocaleTimeString("Default", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
      })
    : d.toLocaleTimeString("Default", {
        hour: "2-digit",
        minute: "2-digit",
      });
  return date;
}
