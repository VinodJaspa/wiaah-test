import { Formik } from "formik";
import React from "react";
import { object, string } from "yup";
import { FormikInput, Button, Badge, RoundedPlusIcon } from "ui";
import { useTranslation } from "react-i18next";

export interface RestaruantAddMenuFormProps {
  onSubmit: ({}: { title: string }) => any;
}

export const RestaruantAddMenuForm: React.FC<RestaruantAddMenuFormProps> = ({
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
    <Badge
      variant="success"
      onClick={() => setAdd(true)}
      className="text-primary cursor-pointer flex gap-2 items-center"
    >
      <RoundedPlusIcon className="border-primary" />
      <p>{t("Add new menu")}</p>
    </Badge>
  );
};
