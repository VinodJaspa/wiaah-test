import { TranslationTextType } from "./TranslationText";

export interface StepperStepType {
  stepName: TranslationTextType;
  stepComponent: React.FC<any>;
  key: string;
}
