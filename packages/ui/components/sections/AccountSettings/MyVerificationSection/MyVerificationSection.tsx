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
  useGetMyVerificationRequest,
} from "@UI";
import { useTypedReactPubsub } from "@libs";

export interface MyVerificationSectionProps {}

export const MyVerificationSection: React.FC<
  MyVerificationSectionProps
> = () => {
  const { t } = useTranslation();

  const { mutate: verify } = useVerifyVerificationCode();
  const { mutate: request } = useRequestAccountVerification();

  const { data } = useGetMyVerificationRequest();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("My Verification")} />
      <AccountVerifciationForm
        onSubmit={(v) => request(v)}
        verificationCode={data?.VVC}
        initialValue={data}
        onVerificationCodeSubmit={(v) => verify(v)}
      />
    </div>
  );
};

export interface AccountVerificationFormData {
  addressProofBill: string;
  dateOfBirth: string;
  firstName: string;
  fullAddress: string;
  id_back: string;
  id_front: string;
  lastName: string;
}

export const AccountVerifciationForm: React.FC<{
  readOnly?: boolean;
  initialValue?: AccountVerificationFormData;
  onSubmit: (data: AccountVerificationFormData) => any;
  verificationCode?: string;
  onVerificationCodeSubmit?: (url: string) => any;
}> = ({
  children,
  onVerificationCodeSubmit,
  verificationCode,
  onSubmit,
  readOnly,
  initialValue,
}) => {
  const { t } = useTranslation();
  const { controls: idFrontControls, uploadImage: idFrontUpload } =
    useMediaUploadControls();
  const { controls: idBackControls, uploadImage: idBackUpload } =
    useMediaUploadControls();

  const {
    controls: addressProofBillControls,
    uploadImage: addressProofBillUpload,
  } = useMediaUploadControls();

  const {
    controls: verificationCodeControls,
    uploadVideo: verificationCodeUpload,
  } = useMediaUploadControls();

  return (
    <Formik<AccountVerificationFormData>
      initialValues={{
        addressProofBill: "",
        dateOfBirth: "",
        firstName: "",
        fullAddress: "",
        id_back: "",
        id_front: "",
        lastName: "",
        ...initialValue,
      }}
      onSubmit={(data) => {
        onSubmit && onSubmit(data);
      }}
    >
      {({ values: _values, setFieldValue }) => {
        const values = readOnly ? initialValue : _values;
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
              {verificationCode ? (
                <>
                  <Divider />
                  <p className="text-lg font-semibold">
                    {t(
                      `write/print your verification code (${verificationCode}) on a paper and make a 5 seconds selfie holding your ID and your verification code and upload`
                    )}
                  </p>{" "}
                  <Button
                    outline
                    onClick={() => verificationCodeUpload()}
                    className="w-48 h-48 justify-center items-center flex flex-col gap-1"
                  >
                    <PlusIcon className="text-4xl text-primary" />
                  </Button>
                </>
              ) : null}
            </div>
            {verificationCode ? null : (
              <Button type="submit" className="self-end">
                {t("Submit")}
              </Button>
            )}
            <MediaUploadModal
              onImgServerUploaded={(v) =>
                setFieldValue("id_front" as keyof typeof values, v)
              }
              controls={idFrontControls}
            />
            <MediaUploadModal
              onImgUpload={(v) => {}}
              onImgServerUploaded={(v) =>
                setFieldValue("id_back" as keyof typeof values, v)
              }
              controls={idBackControls}
            />
            <MediaUploadModal
              onImgUpload={(v) => {}}
              onImgServerUploaded={(v) =>
                setFieldValue("addressProofBill" as keyof typeof values, v)
              }
              controls={addressProofBillControls}
            />
            {verificationCode ? (
              <MediaUploadModal
                onImgUpload={(v) => {}}
                onVidServerUploaded={(v) =>
                  onVerificationCodeSubmit && onVerificationCodeSubmit(v)
                }
                controls={verificationCodeControls}
              />
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
};
