import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  FormikInput,
  AddBadgeButton,
  MultiChooseInput,
  MultiChooseInputProps,
  PlusIcon,
} from "@UI";
import { singleFileValidation, singlePhotoValidation } from "validation";
import { object, string, number, array, InferType } from "yup";

export interface AddMenuDishInputProps {
  onAdd: ({}: { title: string; price: number; ingredients: string[] }) => any;
}

const formValidSchema = object({
  title: string().required(),
  price: number().required().min(1),
  ingredients: array().of(string().required()).min(0).required(),
  thumbnail: singlePhotoValidation.required(),
});

export const AddMenuDishInput: React.FC<AddMenuDishInputProps> = ({
  onAdd,
}) => {
  const [add, setAdd] = React.useState<boolean>(false);
  const { t } = useTranslation();
  return add ? (
    <Formik<InferType<typeof formValidSchema>>
      validationSchema={formValidSchema}
      initialValues={{ price: 0, title: "", ingredients: [], thumbnail: null }}
      onSubmit={(data) => {
        onAdd && onAdd(data);
        setAdd(false);
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => {
        return (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col sm:flex-row gap-2 items-end">
              <FormikInput
                label={t("Dish title")}
                name="title"
                className="w-full"
              />
              <FormikInput
                label={t("Dish price")}
                name="price"
                type={"number"}
                className="w-full"
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
            <div className="flex flex-col gap-2 cursor-pointer justify-center items-center w-32 h-24 border-primary border-2 rounded-2xl">
              <PlusIcon className="text-primary text-2xl" />
              <p>{t("Add Photo")}</p>
            </div>
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
