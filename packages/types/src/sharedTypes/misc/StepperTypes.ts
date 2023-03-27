import { TranslationTextType } from "./TranslationText";

export interface StepperStepType {
  stepName: TranslationTextType | string;
  stepComponent: React.ReactNode;
  key: string | number;
}
