import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormikInput, Button } from "ui";
import { setTestid } from "utils";
import { InferType, object, string } from "yup";

type BedData = {
  name: string;
};

export interface AddBedInputProps {
  onAdd: (bed: BedData) => any;
}

const AddBedValidationSchema = object({
  name: string().required(),
});

export const AddBedInput: React.FC<AddBedInputProps> = ({ onAdd }) => {
  const { t } = useTranslation();
  return (
    <Formik<InferType<typeof AddBedValidationSchema>>
      onSubmit={(data, { resetForm }) => {
        console.log("submited", data);
        onAdd && onAdd(data);
        resetForm();
      }}
      validationSchema={AddBedValidationSchema}
      initialValues={{ name: "" }}
    >
      {({ handleSubmit, values }) => {
        return (
          <div className="flex gap-2 items-end">
            <FormikInput
              {...setTestid("AddNewBedNameInput")}
              name="name"
              label={t("Enter bed name")}
            />
            <Button
              {...setTestid("AddNewBedAddButton")}
              onClick={() => handleSubmit()}
            >
              {t("Add")}
            </Button>
          </div>
        );
      }}
    </Formik>
  );
};
