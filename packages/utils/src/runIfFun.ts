export type MaybeFn<T> =
  | React.TrackableComponent
  | ((props: T) => React.TrackableComponent);

export function runIfFn<T, P>(valueOrFn: T, props: P): T {
  const isFn = typeof valueOrFn === "function";
  return isFn ? valueOrFn(props) : valueOrFn;
}
