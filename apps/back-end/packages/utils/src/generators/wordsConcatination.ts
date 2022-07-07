export function concatWords(words: string[], beetween: string): string {
  return words.reduce((acc, curr, currIdx, arr) => {
    return currIdx === 0 ? `${curr}` : `${acc} ${beetween} ${curr}`;
  }, "");
}
