import { GqlSelectedFields } from "src/pipes";

export function testSelectedFields<
  TFields extends GqlSelectedFields,
  TData = any
>(fields: TFields, data: TData): true {
  return true;
}
