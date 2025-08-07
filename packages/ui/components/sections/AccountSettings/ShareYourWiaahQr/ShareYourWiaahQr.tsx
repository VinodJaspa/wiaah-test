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
  useResponsive,
  useGetMyProfileQuery,
} from "@UI";
import { useRouting } from "routing";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
export interface ShareYourWiaahQrProps { }

export const ShareYourWiaahQr: React.FC<ShareYourWiaahQrProps> = ({ }) => {
  const { t } = useTranslation();
  const { open } = useShareModal();
  const { getUrl } = useRouting();
  const { data: user } = useGetMyProfileQuery();

  return (
    <div className="flex flex-col w-full h-[max(100%,50rem)] gap-4 p-2">
      <SectionTitle title={t("Share your Wiaah QR")} />
      <div className="w-full flex justify-center items-center">
        <Subtitle className="text-center">
          {t("Your Wiaah QR") + "."}
        </Subtitle>
      </div>

      <div className="flex flex-col-reverse lg:flex-row w-full h-full rounded-l-2xl justify-center items-center">

        <div className="h-full  rounded-r-2xl flex justify-center items-center p-8 w-full">
          <div className="w-[min(100%,25rem)] flex flex-col gap-8">
            <div className="flex justify-center">
              <QrcodeDisplay
                transparentBg
                size={300}
                color="#000"
                value={
                  user ? getUrl((r) => r.visitSocialProfile(user.ownerId)) : ""
                }
              />
            </div>

            <div className="flex gap-8">
              <Button className="w-full text-white text-sm flex items-center justify-center gap-4 fill-white">
                <DownloadIcon />
                {t("JPG")}
              </Button>
              <Button
                colorScheme="darkbrown"
                className="w-full text-white text-sm flex items-center justify-center gap-4 fill-white"
              >
                <DownloadIcon />
                {t("PDF")}
              </Button>
              <Button
                onClick={() =>
                  user
                    ? open(getUrl((r) => r.visitSocialProfile(user.ownerId)))
                    : null
                }
                colorScheme="info"
              >
                <ShareIcon className="text-sm text-white" />
              </Button>
            </div>
            <p className="text-sm text-center">
              {t("Share your Wiaah QR with your friends to keep in Touch") + "."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
