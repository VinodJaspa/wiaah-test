export type MaybeFn<T> = React.ReactNode | ((props: T) => React.ReactNode);

export function runIfFn<T>(valueOrFn: MaybeFn<T>, props: T): T {
  const isFn = typeof valueOrFn === "function";
  return isFn ? valueOrFn(props) : valueOrFn;
}
