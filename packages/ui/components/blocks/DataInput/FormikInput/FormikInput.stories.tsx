import { storybookDataInputBlocksTitle } from "utils";
import { Meta } from "@storybook/react";
import { FormikInput, Select, SelectOption, SelectProps } from "@UI";
import React from "react";
import { Form, Formik } from "formik";

export default {
  title: "UI / blocks / Data Input /FormikInput",
  component: FormikInput,
} as Meta<typeof FormikInput>;

export const Default = () => (
  <Formik initialValues={{}} onSubmit={() => {}}>
    <Form>
      <FormikInput name="test" />
    </Form>
  </Formik>
);
export const WithLabel = () => (
  <Formik initialValues={{}} onSubmit={() => {}}>
    <Form>
      <FormikInput label={"label"} name="test" />
    </Form>
  </Formik>
);
export const WithError = () => (
  <Formik
    initialValues={{
      test: "",
    }}
    onSubmit={() => {}}
  >
    {({ setFieldError }) => {
      React.useEffect(() => {
        setFieldError("test", "test error message");
      }, []);
      return (
        <Form>
          <FormikInput label={"label"} name="test" />
        </Form>
      );
    }}
  </Formik>
);
export const asComponent = () => (
  <Formik
    initialValues={{
      test: "",
    }}
    onSubmit={() => {}}
  >
    {({ setFieldValue }) => {
      return (
        <Form>
          <FormikInput<SelectProps>
            onOptionSelect={(v) => setFieldValue("test", v)}
            as={Select}
            label={"label"}
            name="test"
          >
            {[...Array(5)].map((_, i) => (
              <SelectOption value={i}>option {i}</SelectOption>
            ))}
          </FormikInput>
        </Form>
      );
    }}
  </Formik>
);
