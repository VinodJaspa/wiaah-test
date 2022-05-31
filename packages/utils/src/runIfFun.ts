export type MaybeFn<T> = React.ReactNode | ((props: T) => React.ReactNode);

export function runIfFn<T, P>(valueOrFn: T, props: P): T {
  const isFn = typeof valueOrFn === "function";
  return isFn ? valueOrFn(props) : valueOrFn;
}
