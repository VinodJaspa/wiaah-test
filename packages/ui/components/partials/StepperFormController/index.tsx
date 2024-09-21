import React from "react";
import { MaybeFn, runIfFn } from "utils";
import * as yup from "yup";

type Data = Record<string, any>;

interface StepperFormCtxValues {
  values: Record<string, any>;
  currentStepIdx: number;
  handlerKeys: string[];
  isLastStep: boolean;
  isFirstStep: boolean;
  validate: (data: Data, handlerKey: string) => any;
  unvalidate: (handlerKey: string) => any;
  prevoiusStep: () => any;
  previousStep: () => any;
  nextStep: () => any;
  goToStep: (stepIdx: number) => any;
  setHandler: (handlerKey: string) => any;
}

const StepperFormCtx = React.createContext<StepperFormCtxValues>({
  currentStepIdx: 0,
  values: {},
  handlerKeys: [],
  isFirstStep: true,
  isLastStep: false,
  goToStep: () => { },
  prevoiusStep: () => { },
  validate: () => { },
  unvalidate: () => { },
  nextStep: () => { },
  setHandler: () => { },
  previousStep: () => { },
});

export interface StepperFormControllerProps<DataType> {
  onFormComplete: (data: DataType) => any;
  children: MaybeFn<StepperFormCtxValues>;
  stepsNum: number;
  lock?: boolean;
}

export function StepperFormController<FinaleDataType extends Data>({
  onFormComplete,
  stepsNum,
  children,
  lock = true,
}: StepperFormControllerProps<FinaleDataType>) {
  const [handlers, setHandlers] = React.useState<string[]>([]);
  const [stepsValidation, setStepsValidation] = React.useState<
    Record<string, Data>
  >({});
  const [currentStepIdx, setCurrentStepIdx] = React.useState<number>(0);

  //@ts-ignore
  const MergedData: FinaleDataType = React.useMemo(
    () =>
      Object.entries(stepsValidation).reduce((acc, curr) => {
        const [key, value] = curr;
        return { ...acc, ...value };
      }, {} as Data),
    [stepsValidation]
  );

  const isLastStep = currentStepIdx + 1 === stepsNum;
  const isFirstStep = currentStepIdx === 0;

  function goToStep(stepIdx: number) {
    const handler = handlers[stepIdx];
    if (typeof handler !== "string") return;
    const obj = stepsValidation[handler];
    if (typeof obj === "undefined") return;
    setCurrentStepIdx(stepIdx);
  }
  const validate = React.useCallback((data: Data, handlerKey: string) => {
    setStepsValidation((state) => {
      // Compare using stringified values to avoid unnecessary state updates
      if (JSON.stringify(state[handlerKey]) === JSON.stringify(data)) {
        return state;
      }

      const _state = { ...state };
      _state[handlerKey] = data;
      return _state;
    });

    return MergedData;
  }, []);

  function unvalidate(handlerKey: string) {
    delete stepsValidation[handlerKey];
  }

  function nextStep() {
    if (lock) {
      const currentStepKey = handlers[currentStepIdx];
      if (typeof currentStepKey !== "string") return;

      const currentStepValid = stepsValidation[currentStepKey];
      if (typeof currentStepValid === "undefined") return;

      setCurrentStepIdx((state) => {
        const lastStep = state > stepsNum - 2;

        if (lastStep) {
          onFormComplete(MergedData);
          return state;
        } else {
          return state + 1;
        }
      });
    } else {
      setCurrentStepIdx((state) => {
        const lastStep = state > stepsNum - 2;

        if (lastStep) {
          onFormComplete(MergedData);
          return state;
        } else {
          return state + 1;
        }
      });
    }
  }

  function prevoiusStep() {
    const to = currentStepIdx - 1;
    const newHandlers = handlers.slice(0, to > 0 ? to : 0);
    setStepsValidation((state) => {
      const newObj: Data = {};
      newHandlers.map((handler) => {
        newObj[handler] = state[handler];
      });
      return newObj;
    });

    setCurrentStepIdx((state) => (state > 0 ? state - 1 : state));
  }
  function setHandler(handlerKey: string) {
    setHandlers((state) => {
      const handleIdx = state.findIndex((handler) => handler === handlerKey);
      if (handleIdx > -1) return state;
      return [...state, handlerKey];
    });
  }

  return (
    <StepperFormCtx.Provider
      value={{
        values: MergedData,
        validate,
        nextStep,
        goToStep,
        prevoiusStep,
        previousStep: prevoiusStep,
        currentStepIdx,
        setHandler,
        handlerKeys: handlers,
        unvalidate,
        isFirstStep,
        isLastStep,
      }}
    >
      {runIfFn<StepperFormCtxValues>(children, {
        currentStepIdx,
        goToStep,
        prevoiusStep,
        previousStep: prevoiusStep,
        validate,
        nextStep,
        setHandler,
        handlerKeys: handlers,
        unvalidate,
        isFirstStep,
        isLastStep,
        values: MergedData,
      })}
    </StepperFormCtx.Provider>
  );
}

type StepperFormHandlerChildrenProps = {
  validate: (data: Data) => any;
  values: Data;
};

export interface StepperFormHandlerProps {
  children: MaybeFn<StepperFormHandlerChildrenProps>;
  validationSchema?: yup.AnySchema;
  handlerKey: string;
}

export const StepperFormHandler: React.FC<StepperFormHandlerProps> = ({
  children,
  validationSchema,
  handlerKey,
}) => {
  const { validate, unvalidate, setHandler, values } =
    React.useContext(StepperFormCtx);

  function handleValidate(data: Data) {
    if (!validationSchema) return validate(data, handlerKey);

    const valid = validationSchema.isValidSync(data);

    if (valid) {
      validate(data, handlerKey);
    } else {
      unvalidate(handlerKey);
    }
  }
  React.useEffect(() => {
    setHandler(handlerKey);
  }, [handlerKey]);

  return (
    <>
      {runIfFn<StepperFormHandlerChildrenProps>(children, {
        validate: handleValidate,
        values,
        // errors:[]
      })}
    </>
  );
};
