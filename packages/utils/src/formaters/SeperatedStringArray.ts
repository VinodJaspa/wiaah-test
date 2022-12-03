export const SeperatedStringArray = (arr: string[], seperator: string) => {
  return arr.reduce((acc, curr, i) => {
    return i === 0 ? `${curr}` : `${acc}${seperator}${curr}`;
  }, "");
};
