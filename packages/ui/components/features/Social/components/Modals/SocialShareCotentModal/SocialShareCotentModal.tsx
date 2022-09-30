import React from "react";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  CloseIcon,
  FacebookIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
  PinterestLogoIcon,
  TelegramLogoIcon,
  WhatsappLogoIcon,
  LinkedInLogoIcon,
  AtEmailIcon,
  Divider,
} from "ui";
import { useReactPubsub } from "react-pubsub";
import { useTranslation } from "react-i18next";
import { mapArray, runIfFn } from "utils";
import { useRouting } from "routing";

export const useShareModal = (subscribe: boolean = false) => {
  const [url, setUrl] = React.useState<string>();
  const { Listen, emit } = useReactPubsub((k) => k.shareUrlModal);

  function open(url: string) {
    emit({ url });
  }

  function close() {
    emit();
  }

  if (subscribe) {
    Listen((props) => {
      if (props && "url" in props) {
        setUrl(props.url);
      } else {
        setUrl(undefined);
      }
    });
  }

  return {
    isOpen: !!url,
    url,
    close,
    open,
  };
};

export const SocialShareCotentModal: React.FC = () => {
  const { close, isOpen, url } = useShareModal(true);
  const { visit } = useRouting();
  const { t } = useTranslation();

  const sharablePlatforms: {
    icon: React.ReactNode;
    onClick: () => void;
    label: string;
  }[] = [
    {
      icon: FacebookIcon,
      label: t("Facebook"),
      onClick() {
        if (typeof window !== "undefined") {
          window.location.href = `https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=${url}`;
        }
      },
    },
    {
      icon: InstagramLogoIcon,
      label: t("Instagram"),
      onClick() {},
    },
    {
      icon: WhatsappLogoIcon,
      label: t("Whatsapp"),
      onClick() {},
    },
    {
      icon: TelegramLogoIcon,
      label: t("Telegram"),
      onClick() {},
    },
    {
      icon: LinkedInLogoIcon,
      label: t("Linkedin"),
      onClick() {},
    },
    {
      icon: PinterestLogoIcon,
      label: t("Pinterest"),
      onClick() {},
    },
    {
      icon: TwitterLogoIcon,
      label: t("Twitter"),
      onClick() {},
    },
    {
      icon: AtEmailIcon,
      label: "Email",
      onClick() {},
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={close} isLazy>
      <ModalOverlay />
      <ModalContent>
        <div className="flex p-4 h-full gap-8 flex-col w-full">
          <div className="flex justify-between items-center">
            <span></span>
            <p className="text-2xl font-bold">
              {t("Share on your favorite platform")}
            </p>

            <ModalCloseButton>
              <CloseIcon className="text-xl cursor-pointer" />
            </ModalCloseButton>
          </div>
          <Divider />
          <div className="flex items-center justify-center flex-wrap gap-16 h-full">
            {mapArray(sharablePlatforms, ({ icon, label, onClick }, i) => (
              <div
                className="text-7xl flex items-center flex-col gap-2"
                onClick={() => onClick()}
              >
                {runIfFn(icon)}
                <p className="font-semibold text-base">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
