import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FormikInput,
  DateFormInput,
  MediaUploadModal,
  PlusIcon,
  Button,
  Divider,
  SectionHeader,
  useVerifyVerificationCode,
  useRequestAccountVerification,
  useMediaUploadControls,
  Image,
} from "@UI";
import { randomNum } from "utils";
import { useTypedReactPubsub } from "@libs";

export interface MyVerificationSectionProps {}

export const MyVerificationSection: React.FC<
  MyVerificationSectionProps
> = () => {
  const { t } = useTranslation();
  const { emit } = useTypedReactPubsub((events) => events.openFileUploadModal);
  const { controls: idFrontControls, uploadImage: idFrontUpload } =
    useMediaUploadControls();
  const { controls: idBackControls, uploadImage: idBackUpload } =
    useMediaUploadControls();

  const {
    controls: addressProofBillControls,
    uploadImage: addressProofBillUpload,
  } = useMediaUploadControls();

  const { mutate: verify } = useVerifyVerificationCode();
  const { mutate: request } = useRequestAccountVerification();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("My Verification")} />
      <Formik<Parameters<typeof request>[0]>
        initialValues={{
          addressProofBill: "",
          dateOfBirth: "",
          firstName: "",
          fullAddress: "",
          id_back: "",
          id_front: "",
          lastName: "",
        }}
        onSubmit={(data) => {
          request(data);
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className="flex flex-col w-full gap-4">
              <div className="flex gap-4">
                <FormikInput name="firstName" label={t("First Name")} />
                <FormikInput name="lastName" label={t("Last Name")} />
              </div>
              <div>
                <FormikInput name="address" label={t("Full address")} />
              </div>
              <div>
                <FormikInput
                  as={DateFormInput}
                  name="date_of_birth"
                  label={t("Date of birth")}
                />
              </div>
              <Divider />
              <div className="flex flex-col gap-2">
                <p className="font-bold text-lg">{t("Proof of Address")}</p>
                <p className="font-semibold text-lg">
                  {t(
                    "Please provide a house bill or electricity bill that validate your address, the document must be less than 3 months old"
                  )}
                </p>
                <div className="flex gap-4">
                  <Button
                    outline
                    onClick={() => addressProofBillUpload()}
                    className="w-48 h-48 justify-center items-center flex flex-col gap-1"
                  >
                    {values?.addressProofBill &&
                    values.addressProofBill.length > 0 ? (
                      <Image src={values.addressProofBill} />
                    ) : (
                      <>
                        <p>{t("Upload Document")}</p>
                        <PlusIcon className="text-4xl" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <Divider />
              <div className="flex flex-col gap-2">
                <p className="font-bold text-lg">{t("ID Verification")}</p>
                <div className="flex gap-4">
                  <Button
                    outline
                    onClick={() => idFrontUpload()}
                    className="w-48 h-48 justify-center items-center flex flex-col gap-1"
                  >
                    {values?.id_front && values.id_front.length > 0 ? (
                      <Image src={values.id_front} />
                    ) : (
                      <>
                        <p>{t("Front Side")}</p>
                        <PlusIcon className="text-4xl" />
                      </>
                    )}
                  </Button>

                  <Button
                    outline
                    onClick={() => idBackUpload()}
                    className="w-48 h-48 justify-center items-center flex flex-col gap-1"
                  >
                    {values?.id_back && values.id_back.length > 0 ? (
                      <Image src={values.id_back} />
                    ) : (
                      <>
                        <p>{t("Back Side")}</p>
                        <PlusIcon className="text-4xl" />
                      </>
                    )}
                  </Button>
                </div>
                <Divider />
                <p className="text-lg font-semibold">
                  {t(
                    `take a photo with your face showing clearly while holding your id and a paper with the number`
                  ) +
                    ` ${randomNum(100)} ` +
                    t("written on it")}
                </p>{" "}
                <Button
                  outline
                  onClick={() => emit({ uploadType: "img" })}
                  className="w-48 h-48 justify-center items-center flex flex-col gap-1"
                >
                  <PlusIcon className="text-4xl" />
                </Button>
              </div>
              <Button type="submit" className="self-end">
                {t("Submit")}
              </Button>
              <MediaUploadModal
                onImgUpload={(v) => {}}
                controls={idFrontControls}
              />
              <MediaUploadModal
                onImgUpload={(v) => {}}
                controls={idBackControls}
              />
              <MediaUploadModal
                onImgUpload={(v) => {}}
                controls={addressProofBillControls}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
