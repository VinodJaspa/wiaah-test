export interface CSSValueUnit {
  value: number;
  unit?: CSSUnit;
}

export type CSSUnit = "rem" | "em" | "px";
