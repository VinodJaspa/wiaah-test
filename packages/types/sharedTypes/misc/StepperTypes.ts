import { TranslationTextType } from "./TranslationText";

export interface StepperStepType {
  stepName: TranslationTextType;
  stepComponent: React.TrackableComponent;
  key: string;
}
