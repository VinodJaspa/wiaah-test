export function PubsubWithOnUnsubscribe<T>(
  asyncIterator: AsyncIterator<T | undefined>,
  onCancel: Function,
): AsyncIterator<T | undefined> {
  return Object.assign(asyncIterator, {
    return: function () {
      onCancel();
      return Promise.resolve({ value: undefined, done: true });
    },
  });
}
