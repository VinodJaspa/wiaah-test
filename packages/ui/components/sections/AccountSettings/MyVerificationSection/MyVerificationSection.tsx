import { Form, Formik } from "formik";
import React, { useState } from "react";
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
  Input,
  useResponsive,
  UploadIcon,
} from "@UI";
import { useForm } from "@UI/../utils/src";

export interface MyVerificationSectionProps {}

export const MyVerificationSection: React.FC<
  MyVerificationSectionProps
> = () => {
const { t } = useTranslation();
  const { mutate: verify } = useVerifyVerificationCode();
  const { mutate: request } = useRequestAccountVerification();

  const { isMobile } = useResponsive();
  const { data } = useGetMyVerificationRequest();
  const [state, setState] = useState(data);

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("My Verification")}>
        {isMobile ? (
          <button onClick={() => (state ? request(state) : null)}>
            {t("Submit")}
          </button>
        ) : null}
      </SectionHeader>
      <AccountVerifciationForm
        onChange={(data) => setState(data as any)}
        verificationCode={data?.VVC}
        value={data}
        onVerificationCodeSubmit={(v) => verify(v)}
      />
      {data?.VVC ? null : (
        <Button
          onClick={() => (state ? request(state) : null)}
          className="self-end"
        >
          {t("Submit")}
        </Button>
      )}
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

interface AccountVerifciationFormProps {
  readOnly?: boolean;
  value?: AccountVerificationFormData;
  onChange: (data: AccountVerificationFormData) => any;
  verificationCode?: string;
  onVerificationCodeSubmit?: (url: string) => any;
}

export const AccountVerifciationForm = React.forwardRef(
  (
    {
      onVerificationCodeSubmit,
      verificationCode,
      onChange,
      readOnly,
      value,
    }: AccountVerifciationFormProps,
    ref
  ) => {
    const { form, inputProps, dateInputProps, handleChange } =
      useForm<AccountVerificationFormData>(
        {
          addressProofBill: "",
          dateOfBirth: "",
          firstName: "",
          fullAddress: "",
          id_back: "",
          id_front: "",
          lastName: "",
          ...value,
        },
        value
      );

  const { t } = useTranslation();
    const { controls: idFrontControls, uploadImage: idFrontUpload } =
      useMediaUploadControls();
    const { controls: idBackControls, uploadImage: idBackUpload } =
      useMediaUploadControls();

    const { isMobile } = useResponsive();

    const {
      controls: addressProofBillControls,
      uploadImage: addressProofBillUpload,
    } = useMediaUploadControls();

    const {
      controls: verificationCodeControls,
      uploadVideo: verificationCodeUpload,
    } = useMediaUploadControls();

    return (
      <div className="flex flex-col gap-2">
        <p className="text-lg w-fit font-semibold border-b border-primary">
          {t("Basic Information")}
        </p>
        <div className="flex gap-4">
          <div>
            <p className="text-xs lg:text-base font-medium">
              {t("First Name")}
            </p>
            <Input
              {...inputProps("firstName")}
              placeholder={t("Type here") + "..."}
            />
          </div>
          <div>
            <p className="text-xs lg:text-base font-medium">{t("Last Name")}</p>
            <Input
              {...inputProps("lastName")}
              placeholder={t("Type here") + "..."}
            />
          </div>
        </div>
        <div>
          <p className="text-xs lg:text-base font-medium">
            {t("Full address")}
          </p>
          <Input {...inputProps("fullAddress")} placeholder={t("Type here")} />
        </div>
        <div>
          <p className="text-xs lg:text-base font-medium">
            {t("Date of birth")}
          </p>
          <DateFormInput
            {...dateInputProps("dateOfBirth")}
            placeholder={"DD/MM/YYYY"}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <p className="font-semibold w-fit text-lg border-b border-primary">
            {t("Proof of Address")}
          </p>
          <p className="font-semibold text-secondaryRed lg:text-lg text-sm">
            {t(
              "Please provide a house bill or electricity bill that validate your address, the document must be less than 3 months old*"
            )}
          </p>
          {isMobile ? (
            <button onClick={() => addressProofBillUpload()}>
              <div className="flex font-semibold text-iconGray justify-center items-center flex-col gap-4 py-10">
                <UploadIcon className="text-5xl" />
                <p>{t("Tap to upload")}</p>
              </div>
            </button>
          ) : (
            <div className="flex gap-4">
              <Button
                outline
                onClick={() => addressProofBillUpload()}
                className="w-48 h-48 justify-center items-center flex flex-col gap-1"
              >
                {form?.addressProofBill && form.addressProofBill.length > 0 ? (
                  <Image src={form.addressProofBill} />
                ) : (
                  <>
                    <p>{t("Upload Document")}</p>
                    <PlusIcon className="text-4xl" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">{t("ID Verification")}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {isMobile ? (
              <button onClick={() => idFrontUpload()}>
                <div className="flex font-semibold text-iconGray justify-center items-center flex-col gap-4 py-10">
                  <UploadIcon className="text-5xl" />
                  <p>{t("Front Side")}</p>
                </div>
              </button>
            ) : (
              <Button
                outline
                onClick={() => idFrontUpload()}
                className="w-48 h-48 justify-center items-center flex flex-col gap-1"
              >
                {form?.id_front && form.id_front.length > 0 ? (
                  <Image src={form.id_front} />
                ) : (
                  <>
                    <p>{t("Front Side")}</p>
                    <PlusIcon className="text-4xl" />
                  </>
                )}
              </Button>
            )}

            {isMobile ? (
              <button onClick={() => idBackUpload()}>
                <div className="flex font-semibold text-iconGray justify-center items-center flex-col gap-4 py-10">
                  <UploadIcon className="text-5xl" />
                  <p>{t("Back Side")}</p>
                </div>
              </button>
            ) : (
              <Button
                outline
                onClick={() => idBackUpload()}
                className="w-48 h-48 justify-center items-center flex flex-col gap-1"
              >
                {form?.id_back && form.id_back?.length > 0 ? (
                  <Image src={form.id_back} />
                ) : (
                  <>
                    <p>{t("Back Side")}</p>
                    <PlusIcon className="text-4xl" />
                  </>
                )}
              </Button>
            )}
          </div>
          {verificationCode ? (
            <>
              <Divider />
              <p className="text-lg font-semibold">
                {t(
                  `write/print your verification code (${verificationCode}) on a paper and make a 5 seconds selfie holding your ID and your verification code and upload`
                )}
              </p>{" "}
              {isMobile ? (
                <button onClick={() => verificationCodeUpload()}>
                  <div className="flex font-semibold text-iconGray justify-center items-center flex-col gap-4 py-10">
                    <UploadIcon className="text-5xl" />
                    <p>{t("Upload Photo")}</p>
                  </div>
                </button>
              ) : (
                <Button
                  outline
                  onClick={() => verificationCodeUpload()}
                  className="w-48 h-48 justify-center items-center flex flex-col gap-1"
                >
                  <PlusIcon className="text-4xl text-primary" />
                </Button>
              )}
            </>
          ) : null}
        </div>

        <MediaUploadModal
          onImgServerUploaded={(v) => handleChange("id_front", v)}
          controls={idFrontControls}
        />
        <MediaUploadModal
          onImgUpload={(v) => {}}
          onImgServerUploaded={(v) => handleChange("id_back", v)}
          controls={idBackControls}
        />
        <MediaUploadModal
          onImgUpload={(v) => {}}
          onImgServerUploaded={(v) => handleChange("addressProofBill", v)}
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
      </div>
    );
  }
);
