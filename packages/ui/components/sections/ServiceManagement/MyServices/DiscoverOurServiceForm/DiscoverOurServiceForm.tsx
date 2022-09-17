import React from "react";
import { useReactPubsub } from "react-pubsub";
import { FileRes } from "utils";
import { MediaUploadModal } from "ui";
import { useTranslation } from "react-i18next";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";

export interface DiscoverOurServiceFormProps {
  serviceLabel: string;
  onChange: (props: any) => any;
}

const MAX_PRODUCTS_IMAGE = 4;

export const DiscoverOurServiceForm: React.FC<DiscoverOurServiceFormProps> = ({
  serviceLabel,
  onChange,
}) => {
  const { t } = useTranslation();
  const [images, setImages] = React.useState<FileRes[]>([]);
  const [videos, setVideos] = React.useState<string[]>([]);
  const { emit } = useReactPubsub((keys) => keys.openLoginPopup);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-semibold">
        {t("Discover Our") + " " + serviceLabel}
      </p>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">{t("Upload Video")}</p>
        <div className="grid gap-4 grid-cols-[repeat(5,min(100%,8rem))]">
          <div
            onClick={() => {
              emit({ uploadType: "video" });
            }}
            className="cursor-pointer justify-center items-center h-32 w-32 bg-gray-100 border-gray-300 border-[1px] flex"
          >
            <HiVideoCamera className="text-4xl text-primary" />
          </div>
          {videos.map((vid, i) => (
            <div key={i} className="w-32 h-32">
              <video
                className="w-full h-full object-cover"
                key={i}
                //@ts-ignore
                src={vid}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">{t("Upload Images")}</p>
        <div className="grid gap-4 grid-cols-[repeat(5,min(100%,8rem))]">
          {[...Array(MAX_PRODUCTS_IMAGE)].map((_, i) => (
            <div
              onClick={() => {
                emit({});
              }}
              className="cursor-pointer justify-center items-center h-32 w-32 bg-gray-100 border-gray-300 border-[1px] flex"
            >
              {images[i] ? (
                <>
                  <img
                    className="w-full h-full object-cover"
                    key={i}
                    //@ts-ignore
                    src={images[i]}
                  />
                </>
              ) : (
                <HiFolderAdd className="text-4xl text-primary" />
              )}
            </div>
          ))}
        </div>
      </div>
      <MediaUploadModal
        multiple
        onVidUpload={(res) => {
          setVideos((state) => [...state, res]);
        }}
        onImgUpload={(res) =>
          setImages((images) => {
            if (images.length >= MAX_PRODUCTS_IMAGE) return images;
            return [...images, res];
          })
        }
      />
    </div>
  );
};
