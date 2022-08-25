import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, FormikInput, RoundedPlusIcon, Badge } from "ui";
import { object, string, number } from "yup";

export interface AddMenuDishInputProps {
  onAdd: ({}: { title: string; price: number }) => any;
}

export const AddMenuDishInput: React.FC<AddMenuDishInputProps> = ({
  onAdd,
}) => {
  const [add, setAdd] = React.useState<boolean>(false);
  const { t } = useTranslation();
  return add ? (
    <Formik
      validationSchema={object({
        title: string().required(),
        price: number().required().min(1),
      })}
      initialValues={{ price: 0, title: "" }}
      onSubmit={(data) => {
        onAdd && onAdd(data);
        setAdd(false);
      }}
    >
      {({ handleSubmit }) => {
        return (
          <div className="flex gap-2 items-end">
            <FormikInput
              label={t("Dish title")}
              name="title"
              className="w-full"
            />
            <FormikInput
              label={t("Dish price")}
              name="price"
              className="w-fit"
            />
            <Button onClick={() => handleSubmit()} className="h-fit">
              {t("Add")}
            </Button>
          </div>
        );
      }}
    </Formik>
  ) : (
    <Badge
      variant="success"
      onClick={() => setAdd(true)}
      className="flex gap-2 items-center text-primary cursor-pointer"
    >
      <RoundedPlusIcon className="border-primary" />
      <p>{t("Add new dish")}</p>
    </Badge>
  );
};
