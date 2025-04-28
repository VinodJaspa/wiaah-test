interface MathDateOptions {
  hours?: number;
  minutes?: number;
  days?: number;
}

export function SubtractFromDate(date: Date, opt: MathDateOptions): Date {
  if (isNaN(Date.parse(new Date(date).toString())))
    throw new Error("bad date object");

  const newDate = new Date(date);

  if (opt.days) {
    newDate.setDate(newDate.getDate() - opt.days);
  }
  if (opt.hours) {
    newDate.setHours(newDate.getHours() - opt.hours);
  }
  if (opt.minutes) {
    newDate.setMinutes(newDate.getMinutes() - opt.minutes);
  }

  return newDate;
}

export function AddToDate(date: Date, opt: MathDateOptions): Date {
  if (isNaN(Date.parse(new Date(date).toString())))
    throw new Error("bad date object");

  const newDate = new Date(date);

  if (opt.days) {
    newDate.setDate(newDate.getDate() + opt.days);
  }
  if (opt.hours) {
    newDate.setHours(newDate.getHours() + opt.hours);
  }
  if (opt.minutes) {
    newDate.setMinutes(newDate.getMinutes() + opt.minutes);
  }

  return newDate;
}
