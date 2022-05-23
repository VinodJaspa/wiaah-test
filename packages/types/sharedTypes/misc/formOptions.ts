import { TranslationTextType } from "./TranslationText";

export type FormOptionType = {
  value: string;
  name: TranslationTextType;
};
export type FormOptWithCompType<TData = void> = FormOptionType & {
  component: React.FC<{ onData: (data: TData) => any }>;
};
