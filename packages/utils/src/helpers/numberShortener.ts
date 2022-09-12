export function NumberShortner(number: number): string {
  const formatter = Intl.NumberFormat("em-us", { notation: "compact" });

  return formatter.format(number);

  // if (number > 999999) {
  //   // price is more than a million
  //   const remaining = number % 1000000;
  //   const numString = String(number);
  //   let subStr = numString.substring(0, numString.length - 6);
  //   if (remaining >= 100000) {
  //     subStr = subStr.concat(`.${String(remaining).substring(0, 1)}`);
  //   }

  //   return `${Number(subStr)}M`;
  // } else if (number > 999) {
  //   // price is more than a thousand
  //   const remaining = number % 1000;
  //   const numString = String(number);
  //   let subStr = numString.substring(0, numString.length - 3);
  //   if (remaining >= 100) {
  //     subStr = subStr.concat(`.${String(remaining).substring(0, 1)}`);
  //   }
  //   return `${Number(subStr)}K`;
  // } else {
  //   return String(number);
  // }
}
