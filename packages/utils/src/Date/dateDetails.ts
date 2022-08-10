export const DateDetails = (
  date: Date | string | number,
  locale: string = "en-us"
) => {
  if (isNaN(Date.parse(new Date(date).toString()))) {
    return null;
  }

  const newDate = new Date(date);

  const am_pm_hour = newDate.toLocaleTimeString(locale, {
    hour: "2-digit",
    hour12: true,
  });
  const am_pm_hour_minute = newDate.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const am_pm_hour_minute_second = newDate.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const second = newDate.toLocaleTimeString(locale, {
    second: "2-digit",
  });

  const minute = newDate.toLocaleTimeString(locale, {
    minute: "2-digit",
  });
  const hour = newDate.toLocaleTimeString(locale, {
    hour: "2-digit",
    hour12: false,
  });
  const day = newDate.toLocaleDateString(locale, {
    day: "2-digit",
  });

  const concatTimeFirstZero = (timeunit: string) =>
    parseInt(timeunit) < 10 ? `0${timeunit}` : timeunit;

  const twoDigitMinute = concatTimeFirstZero(minute);
  const twoDigitSecond = concatTimeFirstZero(second);

  const weekDay_long = newDate.toLocaleDateString(locale, {
    weekday: "long",
  });
  const weekDay_narrow = newDate.toLocaleDateString(locale, {
    weekday: "narrow",
  });
  const weekDay_short = newDate.toLocaleDateString(locale, {
    weekday: "short",
  });

  const month_num = newDate.toLocaleDateString(locale, {
    month: "numeric",
  });
  const month_2digit = newDate.toLocaleDateString(locale, {
    month: "2-digit",
  });

  const month_narrow = newDate.toLocaleDateString(locale, {
    month: "narrow",
  });
  const month_short = newDate.toLocaleDateString(locale, {
    month: "short",
  });
  const month_long = newDate.toLocaleDateString(locale, {
    month: "long",
  });

  const year_2digit = newDate.toLocaleDateString(locale, {
    year: "2-digit",
  });
  const year_num = newDate.toLocaleDateString(locale, {
    year: "numeric",
  });

  return {
    second,
    minute,
    hour,
    day,
    twoDigitMinute,
    twoDigitSecond,
    weekDay_long,
    weekDay_narrow,
    weekDay_short,
    month_2digit,
    month_long,
    month_narrow,
    month_num,
    month_short,
    year_2digit,
    year_num,
    am_pm_hour,
    am_pm_hour_minute,
    am_pm_hour_minute_second,
  };
};
