import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  FormikInput,
  AddBadgeButton,
  MultiChooseInput,
  MultiChooseInputProps,
} from "ui";
import { object, string, number, array, InferType } from "yup";

export interface AddMenuDishInputProps {
  onAdd: ({}: { title: string; price: number; ingredients: string[] }) => any;
}

const formValidSchema = object({
  title: string().required(),
  price: number().required().min(1),
  ingredients: array().of(string().required()).min(0).required(),
});

export const AddMenuDishInput: React.FC<AddMenuDishInputProps> = ({
  onAdd,
}) => {
  const [add, setAdd] = React.useState<boolean>(false);
  const { t } = useTranslation();
  return add ? (
    <Formik<InferType<typeof formValidSchema>>
      validationSchema={formValidSchema}
      initialValues={{ price: 0, title: "", ingredients: [] }}
      onSubmit={(data) => {
        onAdd && onAdd(data);
        setAdd(false);
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => {
        return (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2 items-end">
              <FormikInput
                label={t("Dish title")}
                name="title"
                className="w-full"
              />
              <FormikInput
                containerProps={{ className: "w-[fit-content]" }}
                label={t("Dish price")}
                name="price"
                className="w-fit"
              />
            </div>
            <FormikInput<MultiChooseInputProps>
              as={MultiChooseInput}
              placeholder={t("Add ingredient")}
              name="ingredients"
              label={t("Ingredients")}
              value={values.ingredients}
              onChange={(data) => setFieldValue("ingredients", data)}
              suggestions={[
                t("fish"),
                t("tomato"),
                t("sauce"),
                t("cucamber"),
                t("onion"),
                t("rice"),
                t("meat"),
              ]}
            />
            <div className="flex items-center gap-2 justify-end">
              <Button onClick={() => setAdd(false)} className="h-fit self-end">
                {t("Cancel")}
              </Button>
              <Button onClick={() => handleSubmit()} className="h-fit self-end">
                {t("Add")}
              </Button>
            </div>
          </div>
        );
      }}
    </Formik>
  ) : (
    <AddBadgeButton onClick={() => setAdd(true)}>
      {t("Add new dish")}
    </AddBadgeButton>
  );
};
