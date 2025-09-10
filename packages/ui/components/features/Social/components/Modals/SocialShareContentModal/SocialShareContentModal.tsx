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
  useSocialControls,
} from "@UI";
import { useTranslation } from "react-i18next";
import { mapArray, runIfFn } from "utils";
import { useTypedReactPubsub } from "@libs";

export const useShareModal = (subscribe: boolean = false) => {
  const [url, setUrl] = React.useState<string>();
  const { Listen, emit } = useTypedReactPubsub((k) => k.shareUrlModal);

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
  const { value, cancelShareLink } = useSocialControls("shareLink");
const { t } = useTranslation();

  const sharablePlatforms: {
    icon: React.ReactNode;
    onClick: () => void;
    label: string;
  }[] = [
    {
      icon: (
        <img
          className="w-[1em] bg-primary rounded-xl px-2 h-[1em] object-contain"
          src="/wiaah_logo.png"
          alt=""
        />
      ),
      label: t("Wiaah messages"),
      onClick() {},
    },
    {
      icon: <FacebookIcon />,
      label: t("Facebook"),
      onClick() {
        if (typeof window !== "undefined") {
          window.location.href = `https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=${value}`;
        }
      },
    },
    {
      icon: <InstagramLogoIcon />,
      label: t("Instagram"),
      onClick() {},
    },
    {
      icon: <WhatsappLogoIcon />,
      label: t("Whatsapp"),
      onClick() {},
    },
    {
      icon: <TelegramLogoIcon />,
      label: t("Telegram"),
      onClick() {},
    },
    {
      icon: <LinkedInLogoIcon />,
      label: t("Linkedin"),
      onClick() {},
    },
    {
      icon: <PinterestLogoIcon />,
      label: t("Pinterest"),
      onClick() {},
    },
    {
      icon: <TwitterLogoIcon />,
      label: t("Twitter"),
      onClick() {},
    },
    {
      icon: <AtEmailIcon />,
      label: "Email",
      onClick() {},
    },
  ];

  return (
    <Modal z={10000000} isOpen={!!value} onClose={cancelShareLink} isLazy>
      <ModalOverlay />
      <ModalContent>
        <div className="flex p-4 h-full gap-8 flex-col w-full mb-10">
          <div className="flex justify-between items-center">
            <span></span>
            <p className="text-lg font-semibold">
              {t("Share on your favorite platform")}
            </p>

            <ModalCloseButton>
              <CloseIcon className="text-xl cursor-pointer" />
            </ModalCloseButton>
          </div>
          <Divider />
          <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center h-[16rem] overflow-scroll gap-8 thinScroll">
            {mapArray(sharablePlatforms, ({ icon, label, onClick }, i) => (
              <div
                key={i}
                className="text-7xl flex items-center flex-col gap-2 cursor-pointer"
                onClick={() => onClick()}
              >
                {runIfFn(icon)}
                <p className="font-medium whitespace-nowrap text-base">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
