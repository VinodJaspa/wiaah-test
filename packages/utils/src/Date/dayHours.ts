export const hoursAday: string[] = [...Array(24)].map((_, i) => {
  const d = new Date(2022, 1, 1, i);
  return new Date(d).toLocaleTimeString("en-us", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  });
});
