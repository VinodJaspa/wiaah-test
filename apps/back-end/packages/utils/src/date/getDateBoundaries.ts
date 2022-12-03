export function GetDateBoundaries(
  date: Date,
  boundaryType: "day" | "week" | "month"
): {
  from: Date;
  to: Date;
} {
  let from = new Date();
  let to = new Date();

  switch (boundaryType) {
    case "month":
      from = new Date(date.getFullYear(), date.getMonth());
      to = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      break;
    case "week":
      const first = date.getDate() - date.getDay();
      console.log({ first, getday: date.getDay(), date: date.getDate() });
      from = new Date(date.getFullYear(), date.getMonth(), first);
      to = new Date(date.getFullYear(), date.getMonth(), first + 6);
      break;
    case "day":
      from = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      to = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      break;
    default:
      break;
  }

  return {
    from,
    to,
  };
}
