import React from "react";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import {
  Modal,
  Stack,
  Divider,
  MenuItem,
  ModalOverlay,
  ModalContent,
} from "ui";
import { mapArray } from "utils";

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

  return {
    emit,
    Listen,
    removeListner,
    OpenModal,
    CloseModal,
  };
};

export const SocialPostSettingsPopup = () => {
  const { Listen, emit, removeListner } = useSocialPostSettingsPopup();
  const [id, setId] = React.useState<string>();
  const { t } = useTranslation();

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

  const options: {
    label: string;
    className?: string;
    onClick: (props: any) => any;
  }[] = [
    {
      label: t("Delete"),
      onClick: () => {},
      className: "text-red-500",
    },
    {
      label: t("Edit"),
      onClick: () => {},
    },
    {
      label: t("Hide"),
      onClick: () => {},
    },
    {
      label: t("Turn off commenting"),
      onClick: () => {},
    },
    {
      label: t("Go to post"),
      onClick: () => {},
    },
    {
      label: t("Report"),
      onClick: () => {},
    },
    {
      label: t("Copy link"),
      onClick: () => {},
    },
    {
      label: t("Desactivate notification"),
      onClick: () => {},
    },
    {
      label: t("Cancel"),
      onClick: handleClose,
    },
  ];

  return (
    <Modal isOpen={!!id} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent className="rounded-[2rem] noScroll">
        <Stack className="items-center text-xl font-bold" col divider={Divider}>
          {options.map(({ label, onClick, className }, i) => (
            <MenuItem
              className={`${className || ""} py-[0.5rem] w-full text-center`}
              onClick={onClick}
            >
              {label}
            </MenuItem>
          ))}
        </Stack>
      </ModalContent>
    </Modal>
  );
};
