import React from "react";
import { useTranslation } from "react-i18next";
import {
  SectionHeader,
  QrcodeDisplay,
  Button,
  DownloadIcon,
  ShareIcon,
  useShareModal,
  useUserData,
} from "@UI";
import { useRouting } from "routing";
export interface ShareYourWiaahQrProps {}

export const ShareYourWiaahQr: React.FC<ShareYourWiaahQrProps> = ({}) => {
  const { t } = useTranslation();
  const { open } = useShareModal();
  const { getUrl } = useRouting();
  const { user } = useUserData();
  console.log({ user });
  return (
    <div className="flex flex-col w-full h-[max(100%,50rem)] gap-4">
      <SectionHeader sectionTitle={t("Share your Wiaah QR")} />
      <div className="flex  w-full h-full rounded-l-2xl bg-primary-100 justify-center items-center">
        <div className="w-full justify-center items-center flex h-full p-8">
          <p className="text-6xl text-center leading-normal font-semibold">
            {t("Share your Wiaah QR with your friends to keep in Touch") + "."}
          </p>
        </div>
        <div className="bg-primary-800 h-full  rounded-r-2xl flex justify-center items-center p-8 w-full">
          <div className="w-[min(100%,25rem)] flex flex-col gap-8">
            <QrcodeDisplay transparentBg color="#ffffff" value="id" />
            <div className="flex gap-8">
              <Button className="w-full text-white text-xl flex items-center justify-center gap-4 fill-white">
                <DownloadIcon />
                {t("JPG")}
              </Button>
              <Button className="w-full text-white text-xl flex items-center justify-center gap-4 fill-white">
                <DownloadIcon />
                {t("PDF")}
              </Button>
              <Button
                onClick={() =>
                  user
                    ? open(getUrl((r) => r.visitSellerSocialProfile(user)))
                    : null
                }
                colorScheme="info"
              >
                <ShareIcon className="text-xl text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
