import { CSSUnit, CSSValueUnit } from "types";

export function CSSValueUnitToString(
  input: CSSValueUnit,
  fallbackUnit?: CSSUnit
) {
  return `${input.value}${input.unit || fallbackUnit || "rem"}`;
}
