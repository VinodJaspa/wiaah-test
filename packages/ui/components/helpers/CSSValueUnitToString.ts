import { CSSUnit, CSSValueUnit } from "types/sharedTypes/css/valueUnit";

export function CSSValueUnitToString(
  input: CSSValueUnit,
  fallbackUnit?: CSSUnit
) {
  return `${input.value}${input.unit || fallbackUnit || "rem"}`;
}
