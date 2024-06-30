import { TranslationTextType } from "./TranslationText";

export interface StepperStepType {
  stepName: TranslationTextType | string;
  stepComponent: React.ReactNode | React.FC;
  key: string | number;
}
