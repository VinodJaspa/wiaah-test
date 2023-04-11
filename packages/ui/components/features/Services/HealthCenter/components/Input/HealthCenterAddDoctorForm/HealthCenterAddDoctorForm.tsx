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
} from "@UI";
import { FileRes, setTestid } from "utils";
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
      initialValues={{ name: "", picture: "", specialist: "" }}
      onSubmit={(values, { resetForm }) => {
        console.log("submited", values);
        if (onAdd && values.name.length > 0) {
          console.log("added", values);
          onAdd({
            ...values,
          });
          resetForm();
          setAdd(false);
        }
      }}
    >
      {({ handleSubmit, isValid, errors, setFieldValue, values }) => {
        console.log("input", values);
        return (
          <div
            className={`${
              isValid ? "items-end" : "items-center"
            } flex gap-2 w-full`}
          >
            <FormikInput
              onChange={(e) => setFieldValue("name", e.target.value)}
              value={values.name}
              name="name"
              placeholder={t("name") + "..."}
              label={t("Doctor name")}
              {...setTestid("DoctorNameInput")}
            />
            <div className="w-full">
              <FormikInput<SelectProps>
                name="specialist"
                {...setTestid("DoctorSpecialistSelectInput")}
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
            <div className="flex flex-col -translate-y-2 transform gap-2 w-full">
              <p className="font-semibold">{t("Photo")}</p>
              <div
                {...setTestid("DoctorPhotoButton")}
                onClick={() => {
                  uploadImage();
                }}
                className={`${
                  errors.picture ? "animate-pulse text-red-400" : "text-primary"
                } cursor-pointer justify-center rounded items-center h-10 w-10 bg-gray-100 border-gray-300 border-[1px] flex`}
              >
                <HiFolderAdd className="text-3xl" />
              </div>
            </div>
            <MediaUploadModal
              {...setTestid("PhotoUploadModal")}
              onImgUpload={(res) => setFieldValue("picture", res)}
            />
            <Button
              {...setTestid("DoctorAddBtn")}
              onClick={() => handleSubmit()}
              type="button"
            >
              {t("Add")}
            </Button>
          </div>
        );
      }}
    </Formik>
  ) : (
    <AddBadgeButton
      {...setTestid("AddNewDoctorButton")}
      onClick={() => setAdd(true)}
    >
      {t("Add a new doctor")}
    </AddBadgeButton>
  );
};
