import { TranslationTextType } from "./TranslationText";

export type OptionKeys = string;

export type FormOptionType<T = string> = {
  value: OptionKeys;
  name: TranslationTextType;
};

export type FormOptWithCompType<TData = void> = FormOptionType & {
  component: React.FC<{
    values: TData;
    setFieldValue: (field: string, value: any) => void;
  }>;
};
