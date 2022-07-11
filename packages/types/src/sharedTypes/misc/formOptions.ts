import { TranslationTextType } from "./TranslationText";

export type FormOptionType<T = string> = {
  value: T;
  name: TranslationTextType;
};
export type FormOptWithCompType<TData = void> = FormOptionType & {
  component: React.FC<{ onData: (data: TData) => any }>;
};
