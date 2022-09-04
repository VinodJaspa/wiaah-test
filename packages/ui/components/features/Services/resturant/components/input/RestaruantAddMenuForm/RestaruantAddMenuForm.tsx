import { Formik } from "formik";
import React from "react";
import { object, string } from "yup";
import { FormikInput, Button, AddBadgeButton } from "ui";
import { useTranslation } from "react-i18next";

export interface RestaurantAddMenuFormProps {
  onSubmit: ({}: { title: string }) => any;
}

export const RestaurantAddMenuForm: React.FC<RestaurantAddMenuFormProps> = ({
  onSubmit,
}) => {
  const [add, setAdd] = React.useState<boolean>(false);
  const { t } = useTranslation();
  return add ? (
    <Formik
      validationSchema={object({ title: string().required() })}
      initialValues={{ title: "" }}
      onSubmit={(data) => {
        onSubmit && onSubmit(data);
        setAdd(false);
      }}
    >
      {({ handleSubmit }) => {
        return (
          <div className="flex gap-4">
            <FormikInput
              label={t("Add a new menu")}
              className="w-full"
              placeholder={t("New menu Name")}
              name="title"
            />
            <Button onClick={() => handleSubmit()} className="self-end">
              {t("Add")}
            </Button>
          </div>
        );
      }}
    </Formik>
  ) : (
    <AddBadgeButton onClick={() => setAdd(true)}>
      {t("Add new menu")}
    </AddBadgeButton>
  );
};
