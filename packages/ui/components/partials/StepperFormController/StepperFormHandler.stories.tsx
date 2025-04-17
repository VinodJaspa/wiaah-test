import { storybookPartailsTitle, StorybookImplemntationLayout } from "utils";
import { Meta } from "@storybook/react";
import { StepperFormHandler, StepperFormController } from "./index";
import { CheckMarkStepper, FormikInput, Button } from "@UI";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";

export default {
  title: "UI / partials / StepperFormHandler",
  component: StepperFormHandler,
} as Meta<typeof StepperFormHandler>;

const test1Schema = yup.object().shape({
  first: yup.string().required().min(5),
});
const test2Schema = yup.object().shape({
  last: yup.string().required().min(5),
});
const test3Schema = yup.object().shape({
  user: yup.string().required().min(5),
});

export const Default = () => {
  const [data, setData] = React.useState<Object>();
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Formik, Form } from "formik";
import {
  CheckMarkStepper,
  FormikInput,
  Button,
  StepperFormController,
  StepperFormHandler,
} from "@UI";
import * as yup from "yup";

const test1Schema = yup.object().shape({
  first: yup.string().required().min(5),
});
const test2Schema = yup.object().shape({
  last: yup.string().required().min(5),
});
const test3Schema = yup.object().shape({
  user: yup.string().required().min(5),
});

const Example:React.FC = () => {
  return (
    <div className="w-1/2 mx-auto">
      <StepperFormController
        stepsNum={3}
        onFormComplete={setData}
      >
        {({ currentStepIdx, goToStep, nextStep, prevoiusStep }) => {
          return (
            <div className="flex flex-col gap-8 w-full">
              <CheckMarkStepper
                currentStepIdx={currentStepIdx}
                onStepChange={goToStep}
                steps={[
                  {
                    key: "test1",
                    stepComponent: (
                      <StepperFormHandler
                        validationSchema={test1Schema}
                        handlerKey="test1"
                      >
                        {({ validate }) => <TextForm1 onValid={validate} />}
                      </StepperFormHandler>
                    ),
                    stepName: {
                      fallbackText: "first",
                      translationKey: "",
                    },
                  },
                  {
                    key: "test2",
                    stepComponent: (
                      <StepperFormHandler
                        validationSchema={test2Schema}
                        handlerKey="test2"
                      >
                        {({ validate }) => <TextForm2 onValid={validate} />}
                      </StepperFormHandler>
                    ),
                    stepName: {
                      fallbackText: "last",
                      translationKey: "",
                    },
                  },
                  {
                    key: "test3",
                    stepComponent: (
                      <StepperFormHandler
                        validationSchema={test3Schema}
                        handlerKey={"test3"}
                      >
                        {({ validate }) => <TextForm3 onValid={validate} />}
                      </StepperFormHandler>
                    ),
                    stepName: {
                      fallbackText: "user",
                      translationKey: "",
                    },
                  },
                ]}
              />
              <div className="flex justify-between w-full">
                <Button onClick={() => prevoiusStep()}>prev</Button>
                <Button onClick={() => nextStep()}>next</Button>
              </div>
            </div>
          );
        }}
      </StepperFormController>
    </div>
  );
};

const TextForm1: React.FC<{ onValid: (values: Object) => any }> = ({
  onValid,
}) => {
  return (
    <Formik
      validationSchema={test1Schema}
      initialValues={{}}
      onSubmit={() => {}}
    >
      {({ values }) => {
        onValid(values);
        return (
          <Form>
            <FormikInput placeholder="firstname" name="first" />
          </Form>
        );
      }}
    </Formik>
  );
};
const TextForm2: React.FC<{ onValid: (values: Object) => any }> = ({
  onValid,
}) => {
  return (
    <Formik
      validationSchema={test2Schema}
      initialValues={{}}
      onSubmit={() => {}}
    >
      {({ values }) => {
        onValid(values);
        return (
          <Form>
            <FormikInput placeholder="lastname" name="last" />
          </Form>
        );
      }}
    </Formik>
  );
};
const TextForm3: React.FC<{ onValid: (values: Object) => any }> = ({
  onValid,
}) => {
  return (
    <Formik
      validationSchema={test3Schema}
      initialValues={{}}
      onSubmit={() => {}}
    >
      {({ values }) => {
        onValid(values);
        return (
          <Form>
            <FormikInput placeholder="username" name="user" />
          </Form>
        );
      }}
    </Formik>
  );
};
    `}
    >
      <StepperFormController stepsNum={3} onFormComplete={setData}>
        {({ currentStepIdx, goToStep, nextStep, previousStep }) => {
          return (
            <div className="flex flex-col gap-8 w-full">
              <CheckMarkStepper
                currentStepIdx={currentStepIdx}
                onStepChange={goToStep}
                steps={[
                  {
                    key: "test1",
                    stepComponent: (
                      <StepperFormHandler
                        validationSchema={test1Schema}
                        handlerKey="test1"
                      >
                        {({ validate }) => <TextForm1 onValid={validate} />}
                      </StepperFormHandler>
                    ),
                    stepName: {
                      fallbackText: "first",
                      translationKey: "",
                    },
                  },
                  {
                    key: "test2",
                    stepComponent: (
                      <StepperFormHandler
                        validationSchema={test2Schema}
                        handlerKey="test2"
                      >
                        {({ validate }) => <TextForm2 onValid={validate} />}
                      </StepperFormHandler>
                    ),
                    stepName: {
                      fallbackText: "last",
                      translationKey: "",
                    },
                  },
                  {
                    key: "test3",
                    stepComponent: (
                      <StepperFormHandler
                        validationSchema={test3Schema}
                        handlerKey={"test3"}
                      >
                        {({ validate }) => <TextForm3 onValid={validate} />}
                      </StepperFormHandler>
                    ),
                    stepName: {
                      fallbackText: "user",
                      translationKey: "",
                    },
                  },
                ]}
              />
              <div className="flex justify-between w-full">
                <Button onClick={() => previousStep()}>prev</Button>
                <Button onClick={() => nextStep()}>next</Button>
              </div>
            </div>
          );
        }}
      </StepperFormController>
      <pre className="text-lg py-4">{JSON.stringify(data)}</pre>
    </StorybookImplemntationLayout>
  );
};

const TextForm1: React.FC<{ onValid: (values: Object) => any }> = ({
  onValid,
}) => {
  return (
    <Formik
      validationSchema={test1Schema}
      initialValues={{}}
      onSubmit={() => {}}
    >
      {({ values }) => {
        onValid(values);
        return (
          <Form>
            <FormikInput placeholder="firstname" name="first" />
          </Form>
        );
      }}
    </Formik>
  );
};
const TextForm2: React.FC<{ onValid: (values: Object) => any }> = ({
  onValid,
}) => {
  return (
    <Formik
      validationSchema={test2Schema}
      initialValues={{}}
      onSubmit={() => {}}
    >
      {({ values }) => {
        onValid(values);
        return (
          <Form>
            <FormikInput placeholder="lastname" name="last" />
          </Form>
        );
      }}
    </Formik>
  );
};
const TextForm3: React.FC<{ onValid: (values: Object) => any }> = ({
  onValid,
}) => {
  return (
    <Formik
      validationSchema={test3Schema}
      initialValues={{}}
      onSubmit={() => {}}
    >
      {({ values }) => {
        onValid(values);
        return (
          <Form>
            <FormikInput placeholder="username" name="user" />
          </Form>
        );
      }}
    </Formik>
  );
};
