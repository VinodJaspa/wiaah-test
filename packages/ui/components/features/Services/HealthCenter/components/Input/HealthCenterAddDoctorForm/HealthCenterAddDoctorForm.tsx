import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiFolderAdd } from "react-icons/hi";
import { useReactPubsub } from "react-pubsub";
import {
  AddBadgeButton,
  Select,
  SelectOption,
  SelectProps,
  FormikInput,
  Button,
  MediaUploadModal,
  useFileUploadModal,
} from "ui";
import { FileRes } from "utils";
import { mixed, object, string } from "yup";

export type DoctorInputData = {
  name: string;
  specialist: string;
  picture: FileRes;
};

export interface HealthCenterAddDoctorFormProps {
  onAdd: (data: DoctorInputData) => any;
}

export const HealthCenterAddDoctorForm: React.FC<
  HealthCenterAddDoctorFormProps
> = ({ onAdd }) => {
  const { t } = useTranslation();
  const { uploadImage } = useFileUploadModal();
  const [add, setAdd] = React.useState<boolean>(false);
  return add ? (
    <Formik<DoctorInputData>
      validationSchema={object({
        name: string().required(),
        specialist: string().required(),
        picture: mixed().test({
          name: "doctor photo",
          message: "please provide a valid photo",
          test: (v) => true,
        }),
      })}
      initialValues={{ name: "", picture: "", specialist: "" }}
      onSubmit={(values, { resetForm }) => {
        if (onAdd) {
          onAdd({
            ...values,
            picture:
              "https://t4.ftcdn.net/jpg/03/20/52/31/360_F_320523164_tx7Rdd7I2XDTvvKfz2oRuRpKOPE5z0ni.jpg",
          });
        }

        resetForm();
      }}
    >
      {({ handleSubmit, isValid, errors, setFieldValue, values }) => {
        return (
          <div
            className={`${
              isValid ? "items-end" : "items-center"
            } flex gap-2 w-full`}
          >
            <FormikInput
              name="name"
              placeholder={t("name") + "..."}
              label={t("Doctor name")}
            />
            <div className="w-full">
              <FormikInput<SelectProps>
                name="specialist"
                as={Select}
                onOptionSelect={(v) => setFieldValue("specialist", v)}
                value={values["specialist"]}
                placeholder={t("specialist") + "..."}
                label={t("Doctor specialist")}
              >
                <SelectOption value={"dentist"}>{t("Dentist")}</SelectOption>
                <SelectOption value={"heart_doctor"}>
                  {t("Heart Doctor")}
                </SelectOption>
                <SelectOption value={"generalist"}>
                  {t("Generalist")}
                </SelectOption>
              </FormikInput>
            </div>
            <FormikInput
              label={t("Photo")}
              name={"picture"}
              containerProps={{ className: "w-[fit-content]" }}
              as={() => {
                return (
                  <div
                    onClick={() => {
                      uploadImage();
                    }}
                    className={`${
                      errors.picture
                        ? "animate-pulse text-red-400"
                        : "text-primary"
                    } cursor-pointer justify-center rounded items-center h-10 w-10 bg-gray-100 border-gray-300 border-[1px] flex`}
                  >
                    <HiFolderAdd className="text-3xl" />
                  </div>
                );
              }}
            />
            <MediaUploadModal
              onImgUpload={(res) => setFieldValue("picture", res)}
            />
            <Button onClick={() => handleSubmit()} type="button">
              {t("Add")}
            </Button>
          </div>
        );
      }}
    </Formik>
  ) : (
    <AddBadgeButton onClick={() => setAdd(true)}>
      {t("Add a new doctor")}
    </AddBadgeButton>
  );
};
