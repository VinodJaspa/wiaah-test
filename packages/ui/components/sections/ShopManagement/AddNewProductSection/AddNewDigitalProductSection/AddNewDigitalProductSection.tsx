import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  EditIcon,
  MediaUploadModal,
  useMediaUploadControls,
  Select,
  SelectOption,
} from "ui";

export interface AddNewDigitalProductSectionProps {
  onChange?: (data: Record<string, any>) => any;
}

export const AddNewDigitalProductSection: React.FC<
  AddNewDigitalProductSectionProps
> = ({ onChange }) => {
  const { controls, uploadImage, uploadVideo } = useMediaUploadControls();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 py-8">
      <p className="w-full bg-primary-50 rounded-xl p-4">
        {t("Add files for buyers to purchase and download")}
      </p>

      <Formik initialValues={{} as Record<string, any>} onSubmit={() => {}}>
        {({ values, setFieldValue }) => {
          onChange && onChange(values);
          return (
            <>
              <p className="text-2xl font-semibold">{t("Add File")}</p>

              <Select
                placeholder={t("Select file type")}
                value={values["downloadable_type"]}
                onOptionSelect={(v) => setFieldValue("downloadable_type", v)}
              >
                <SelectOption value={"image"}>{t("Image")}</SelectOption>

                <SelectOption value={"video"}>{t("Video")}</SelectOption>
                <SelectOption value={"document"}>{t("Document")}</SelectOption>
              </Select>
              <div
                onClick={() =>
                  values["donwloadable_type"] === "image"
                    ? uploadImage()
                    : uploadVideo()
                }
                className="cursor-pointer w-32 h-32 bg-white border border-primary rounded-xl flex justify-center items-center"
              >
                <EditIcon className="text-primary text-4xl" />
              </div>
            </>
          );
        }}
      </Formik>

      <MediaUploadModal controls={controls} />
    </div>
  );
};
