"use client";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Textarea, TextAreaProps, Divider } from "@UI/components/partials";
import { FormikInput } from "@UI/components/blocks";
import { mapArray } from "utils";

// lucide icons
import {
  Hash,
  EyeOff,
  ShieldAlert,
  Shield,
  DollarSign,
  MessageCircle,
  Copyright,
  Heart,
  HelpCircle,
  X,
} from "lucide-react";
import { useTypedReactPubsub } from "@libs";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";

export const useSocialReportModal = () => {
  const { Listen, emit, removeListner } = useTypedReactPubsub(
    (events) => events.openSocialReportModal
  );
  function OpenModal(id: string) {
    emit({ id });
  }
  function CloseModal() {
    emit();
  }
  return { OpenModal, CloseModal, Listen, removeListner };
};

export const SocialReportModal: React.FC = () => {
  const { t } = useTranslation();
  const { Listen, removeListner, CloseModal } = useSocialReportModal();
  const [id, setId] = React.useState<string>();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [isOther, setIsOther] = useState(false);
  function handleclose() {
    setId(undefined);
  }

  Listen((props) => {
    if (props) {
      if ("id" in props) {
        setId(props.id);
      } else {
        CloseModal();
      }
    }
  });

  React.useEffect(() => {
    return removeListner;
  }, []);

  function handleSubmit(values: any) {

    setSelectedReason(values.report_reason);
    setIsOther(values.report_reason === "other");

    setConfirmOpen(true);
    handleclose();
  }

  function confirmReport() {
    console.log("Final report submitted:", selectedReason);
    setConfirmOpen(false);
  }


  const reasons = [
    { key: "spam", title: t("It's spam"), icon: <Hash className="h-5 w-5" /> },
    { key: "nudity", title: t("Nudity or sexual activity"), icon: <EyeOff className="h-5 w-5" /> },
    { key: "hate_speech", title: t("Hate speech or symbols"), icon: <ShieldAlert className="h-5 w-5" /> },
    { key: "violence", title: t("Violence or dangerous organizations"), icon: <Shield className="h-5 w-5" /> },
    { key: "illegal_goods", title: t("Sale of illegal or regulated goods"), icon: <DollarSign className="h-5 w-5" /> },
    { key: "bullying", title: t("Bullying or harassment"), icon: <MessageCircle className="h-5 w-5" /> },
    { key: "intellectual_property", title: t("Intellectual property violation"), icon: <Copyright className="h-5 w-5" /> },
    { key: "suicide", title: t("Suicide, self-injury or eating disorders"), icon: <Heart className="h-5 w-5" /> },
    { key: "other", title: t("Other"), input: { placeholder: "other reason" }, icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <>

      <Transition appear show={!!id} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleclose}>
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          {/* Modal container */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col gap-4 w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[80vh] overflow-hidden">
                  {/* Header */}
                  <div className="flex justify-between items-center sticky top-0 bg-white z-10 p-4 border-b">
                    <Dialog.Title className="text-xl sm:text-2xl font-bold">
                      {t("Report post")}
                    </Dialog.Title>
                    <button onClick={handleclose} className="p-2 rounded-full hover:bg-gray-100">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <Formik
                      initialValues={{ report_reason: reasons[0].key }}
                      onSubmit={(data) => handleSubmit(data)}
                    >
                      {({ values, setFieldValue }) => (
                        <Form className="flex flex-col gap-6 pb-4">
                          <p className="text-lightBlack text-base sm:text-lg font-semibold">
                            {t("Why are you reporting this post?")}
                          </p>

                          {/* Desktop Layout */}
                          <div className="flex flex-col gap-3">
                            {mapArray(reasons, ({ title, key }, i) => (
                              <label
                                key={i + key}
                                className={`flex items-center justify-between px-4 py-3 border rounded-xl cursor-pointer transition ${values["report_reason"] === key
                                  ? "border-black bg-gray-50"
                                  : "border-gray-200 bg-white"
                                  }`}
                              >
                                <span className="text-sm sm:text-base">{title}</span>
                                <input
                                  type="radio"
                                  name="report_reason"
                                  value={key}
                                  checked={values["report_reason"] === key}
                                  onChange={() => setFieldValue("report_reason", key)}
                                  className="h-4 w-4 accent-black cursor-pointer"
                                />
                              </label>
                            ))}

                            {/* {values["report_reason"] === "other" ? (
                              <FormikInput<TextAreaProps>
                                label={t("Type Report reason")}
                                value={values["other_reason"]}
                                onChange={(v) => setFieldValue("other_reason", v)}
                                name="other_reason"
                                as={Textarea}
                              />
                            ) : null} */}
                          </div>

                          {/* Mobile Layout */}
                          <div className="flex sm:hidden flex-col gap-3">
                            {mapArray(reasons, ({ title, key, icon }, i) => (
                              <div
                                key={i + key}
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${values["report_reason"] === key
                                  ? "border-black bg-gray-50"
                                  : "border-gray-200"
                                  }`}
                                onClick={() => setFieldValue("report_reason", key)}
                              >
                                {icon}
                                <p className="text-sm font-medium">{title}</p>
                              </div>
                            ))}

                            {/* {values["report_reason"] === "other" ? (
                              <FormikInput<TextAreaProps>
                                label={t("Type Report reason")}
                                value={values["other_reason"]}
                                onChange={(v) => setFieldValue("other_reason", v)}
                                name="other_reason"
                                as={Textarea}
                              />
                            ) : null} */}
                          </div>

                          {/* Footer */}
                          <div className="sticky bottom-0 bg-white p-4 border-t">
                            <div className="flex justify-center sm:justify-end">
                              <PrimaryButton type="submit" className="w-full sm:w-auto">
                                {t("Submit")}
                              </PrimaryButton>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={confirmOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setConfirmOpen(false)}>
          <div className="fixed inset-0 bg-black/40" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
              <Dialog.Title className="text-lg font-bold mb-4">
                {t("Report Submission")}
              </Dialog.Title>

              <p className="font-medium mb-2">
                {t("Are you sure you want to submit this report?")}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {t("Selected reason:")} {selectedReason}
              </p>

              {/* If "Other" reason → show textarea */}
              {isOther && (
                <textarea
                  className="w-full p-3 border rounded-lg mb-4 text-sm"
                  placeholder={t("Tell us more about your report submitting")}
                />
              )}

              <div className="flex gap-3 justify-center">
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  onClick={confirmReport}
                >
                  {t("Submit report")}
                </button>
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                  onClick={() => setConfirmOpen(false)}
                >
                  {t("Cancel")}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
