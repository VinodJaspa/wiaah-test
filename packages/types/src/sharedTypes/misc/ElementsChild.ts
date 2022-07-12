import { HtmlDivProps } from "./HtmlElementsProps";

export type ElementChilds<T = HtmlDivProps> =
  | React.ReactElement<T>
  | React.ReactElement<T>[];
