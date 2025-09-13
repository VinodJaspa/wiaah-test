"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import { useSocialReportModal } from "../SocialReportModal";

export const useSocialPostSettingsPopup = () => {
  const { Listen, emit, removeListner } = useReactPubsub(
    (e) => "OpenSocialPostSettingsPopup"
  );

  function OpenModal(id: string) {
    emit({ id });
  }

  function CloseModal() {
    emit();
  }

  return { emit, Listen, removeListner, OpenModal, CloseModal };
};

export const SocialPostSettingsPopup: React.FC = () => {
  const { Listen, removeListner } = useSocialPostSettingsPopup();
  const { OpenModal } = useSocialReportModal();
  const [id, setId] = React.useState<string>();
  const { t } = useTranslation();

  function handleReport() {
    if (id) {
      OpenModal(id);
    }
    handleClose();
  }

  function handleClose() {
    setId(undefined);
  }

  Listen((props) => {
    if (props && "id" in props) {
      setId(props.id);
    } else {
      handleClose();
    }
  });

  React.useEffect(() => removeListner, []);

  const options = [
    { label: t("Delete"), onClick: () => {}, className: "text-red-600 font-medium" },
    { label: t("Edit"), onClick: () => {} },
    { label: t("Hide"), onClick: () => {} },
    { label: t("Turn off commenting"), onClick: () => {} },
    { label: t("Go to post"), onClick: () => {} },
    { label: t("Report"), onClick: handleReport },
    { label: t("Copy link"), onClick: () => alert("Link copied!") },
    { label: t("Disable notification"), onClick: () => {} },
    { label: t("Cancel"), onClick: handleClose, className: "font-semibold text-gray-600" },
  ];

  return (
    <Transition appear show={!!id} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 flex items-end sm:items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-6 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-6 sm:scale-95"
          >
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white shadow-xl">
              <div className="flex flex-col divide-y">
                {options.map(({ label, onClick, className }, i) => (
                  <button
                    key={i}
                    onClick={onClick}
                    className={`px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 transition text-center ${className || ""}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
