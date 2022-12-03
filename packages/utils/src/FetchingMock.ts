export const FetchingMock = new Promise((res, rej) => {
  setTimeout(() => {
    res(null);
  }, 1000);
});
