import {
  storybookPartailsTitle,
  StorybookImplemntationLayout,
  Counter,
} from "ui/utils";
import { ComponentMeta } from "@storybook/react";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalButton,
  Button,
  ModalExtendedWrapper,
} from "ui";

export default {
  title: storybookPartailsTitle + "Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

export const Default = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Modal, ModalContent, ModalOverlay, ModalCloseButton, Button } from 'ui'
 
...
const [isOpen, setIsOpen] = React.useState<boolean>(false);

return (
    <>
    <Button className="w-fit" onClick={() => setIsOpen(true)}>
        open modal
    </Button>
    <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
    >
        <ModalOverlay />
        <ModalContent>
            <Counter />
        </ModalContent>
    </Modal>
    </>
)
        `}
    >
      <Button className="w-fit" onClick={() => setIsOpen(true)}>
        {t("open_modal", "open modal")}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
      >
        <ModalOverlay />
        <ModalContent>
          <Counter />
          <ModalCloseButton>
            <Button>{t("close", "Close")}</Button>
          </ModalCloseButton>
        </ModalContent>
      </Modal>
    </StorybookImplemntationLayout>
  );
};

export const WithLazy = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Modal, ModalContent, ModalOverlay, ModalCloseButton, Button } from 'ui'
 
...
const [isOpen, setIsOpen] = React.useState<boolean>(false);

return (
    <>
    <Button className="w-fit" onClick={() => setIsOpen(true)}>
        open modal
    </Button>
    <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
    >
        <ModalOverlay />
        <ModalContent isLazy>
          <Counter />
          <ModalCloseButton>
            <Button>{t("close", "Close")}</Button>
          </ModalCloseButton>
        </ModalContent>
    </Modal>
    </>
)
        `}
    >
      <Button className="w-fit" onClick={() => setIsOpen(true)}>
        {t("open_modal", "open modal")}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
      >
        <ModalOverlay />
        <ModalContent isLazy>
          <Counter />
          <ModalCloseButton>
            <Button>{t("close", "Close")}</Button>
          </ModalCloseButton>
        </ModalContent>
      </Modal>
    </StorybookImplemntationLayout>
  );
};

export const extended = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Modal, ModalContent,ModalCloseButton, ModalExtendedWrapper, ModalOverlay, ModalCloseButton, Button } from 'ui'
 
...
const [isOpen, setIsOpen] = React.useState<boolean>(false);

return (
    <>
    <ModalExtendedWrapper modalKey="counter modal">
        <ModalButton>
          <Button className="w-fit">{t("open_modal", "open modal")}</Button>
        </ModalButton>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
        >
          <ModalOverlay />
          <ModalContent isLazy>
            <Counter />
            <ModalCloseButton>
              <Button>{t("close", "Close")}</Button>
            </ModalCloseButton>
          </ModalContent>
        </Modal>
      </ModalExtendedWrapper>
    </>
)
        `}
    >
      <p className="text-center my-2 text-gray-600">
        Tip: useful if you want to trigger the onOpen callback on the wrapped
        modal, without having access to its inner state
      </p>
      <ModalExtendedWrapper modalKey="counter modal">
        <ModalButton>
          <Button className="w-fit">{t("open_modal", "open modal")}</Button>
        </ModalButton>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
        >
          <ModalOverlay />
          <ModalContent isLazy>
            <Counter />
            <ModalCloseButton>
              <Button>{t("close", "Close")}</Button>
            </ModalCloseButton>
          </ModalContent>
        </Modal>
      </ModalExtendedWrapper>
    </StorybookImplemntationLayout>
  );
};
