export function getTimeInAmPm(d: Date) {
  const date = d.toLocaleTimeString("Default", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return date;
}
