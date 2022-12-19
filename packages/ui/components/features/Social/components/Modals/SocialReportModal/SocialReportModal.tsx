import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  Textarea,
  TextAreaProps,
  Radio,
  Divider,
  ModalCloseButton,
  CloseIcon,
  Button,
} from "@UI/components/partials";
import { FormikInput } from "@UI/components/blocks";
import { mapArray } from "utils";

export const useSocialReportModal = () => {
  const { Listen, emit, removeListner } = useReactPubsub(
    (events) => events.openSocialReportModal
  );

  function OpenModal(id: string) {
    emit({ id });
  }
  function CloseModal() {
    emit();
  }
  return {
    OpenModal,
    CloseModal,
    Listen,
    removeListner,
  };
};

export const SocialReportModal: React.FC = () => {
  const { t } = useTranslation();
  const { Listen, removeListner } = useSocialReportModal();
  const [id, setId] = React.useState<string>();

  function handleclose() {
    setId(undefined);
  }

  Listen((props) => {
    if (props) {
      if ("id" in props) {
        setId(props.id);
      } else {
        handleclose();
      }
    }
  });

  React.useEffect(() => {
    return removeListner;
  }, []);

  function handleSubmit(data: any) {
    handleclose();
  }

  const reasons = [
    {
      key: "inappropriate",
      title: t("Inappropriate Content"),
      input: null,
    },
    {
      key: "pretending",
      input: null,
      title: t("Pretending to Be Someone"),
    },
    {
      key: "inappropriate_profile",
      title: t("Inappropriate Profile Info"),
      input: null,
    },
    {
      key: "underage",
      title: t("User could be under 16 years old"),
      input: null,
    },
    {
      key: "intellectual_property",
      title: t("Intellectual property infringement"),
      input: null,
    },
    {
      key: "other",
      input: { placeholder: "other reason" },
      title: t("Other"),
    },
  ];

  return (
    <Modal isOpen={!!id} onClose={handleclose} onOpen={() => {}}>
      <ModalOverlay />
      <ModalContent className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div></div>
          <p className="text-2xl font-bold">{t("Report")}</p>
          <ModalCloseButton>
            <CloseIcon className="text-xl" />
          </ModalCloseButton>
        </div>
        <Divider />
        <Formik
          initialValues={
            { report_reason: reasons[0].key } as Record<string, any>
          }
          onSubmit={(data) => handleSubmit(data)}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col w-full gap-8 text-lg font-bold">
              <p className="text-lightBlack">{t("Please select a scenario")}</p>
              <div className="flex flex-col items-center sm:items-end sm:flex-row justify-between w-full gap-4">
                <div className="flex flex-col gap-8">
                  {mapArray(reasons, ({ title, key }, i) => (
                    <Radio
                      key={i + key}
                      onChange={(e) =>
                        e.target.checked
                          ? setFieldValue("report_reason", key)
                          : null
                      }
                      checked={values["report_reason"] === key}
                      name={"report_reason"}
                    >
                      <p className="font-normal">{title}</p>
                    </Radio>
                  ))}

                  {values["report_reason"] === "other" ? (
                    <FormikInput<TextAreaProps>
                      label={t("Type Report reason")}
                      value={values["other_reason"]}
                      onChange={(v) => setFieldValue("other_reason", v)}
                      name="other_reason"
                      as={Textarea}
                    />
                  ) : null}
                </div>
                <Button>{t("Submit")}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
