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
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@UI";
import { randomNum } from "utils";
import { useTypedReactPubsub } from "@libs";

export interface MyVerificationSectionProps {}

export const MyVerificationSection: React.FC<
  MyVerificationSectionProps
> = () => {
  const { t } = useTranslation();
  const { emit } = useTypedReactPubsub((events) => events.openFileUploadModal);

  const [VVC, setVVC] = React.useState<string>();

  const { mutate: verify } = useVerifyVerificationCode();
  const { mutate: request } = useRequestAccountVerification();

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("My Verification")} />
      <Formik initialValues={{}} onSubmit={() => {}}>
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
                <p className="font-bold text-lg">{t("ID Verification")}</p>
                <div className="flex gap-4">
                  <Button
                    outline
                    onClick={() => emit({ uploadType: "img" })}
                    className="w-48 h-48 justify-center items-center flex flex-col gap-1"
                  >
                    <p>{t("Front Side")}</p>
                    <PlusIcon className="text-4xl" />
                  </Button>

                  <Button
                    outline
                    onClick={() => emit({ uploadType: "img" })}
                    className="w-48 h-48 justify-center items-center flex flex-col gap-1"
                  >
                    <p>{t("Back Side")}</p>
                    <PlusIcon className="text-4xl" />
                  </Button>
                  <MediaUploadModal />
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
              <Button className="self-end">{t("Submit")}</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
