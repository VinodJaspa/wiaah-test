import { GqlSelectedFields } from "../";

export function testSelectedFields<
  TFields extends GqlSelectedFields,
  TData = any
>(fields: TFields, data: TData): true {
  return true;
}
