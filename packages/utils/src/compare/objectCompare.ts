export function ObjectCompare(obj1: object, obj2: object) {
  if (!obj1 || !obj2) return false;
  return Object.keys(obj1).every(
    (key: any) => JSON.stringify(obj1[key]) === JSON.stringify(obj2[key])
  );
}
