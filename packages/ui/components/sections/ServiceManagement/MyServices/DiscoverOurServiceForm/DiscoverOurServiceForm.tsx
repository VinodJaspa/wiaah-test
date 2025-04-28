import React from "react";
import { useReactPubsub } from "react-pubsub";
import { FileRes } from "utils";
import {
  MediaUploadModal,
  ImageColoredIcon,
  VideoAaddIcon,
  PhotoAddIcon,
  Image,
  AspectRatio,
} from "@UI";
import { useTranslation } from "react-i18next";
import { useTypedReactPubsub } from "@libs";

export interface DiscoverOurServiceFormProps {
  serviceLabel: string;
  onChange: (props: any) => any;
}

const MAX_PRODUCTS_IMAGE = 4;

export const DiscoverOurServiceForm: React.FC<DiscoverOurServiceFormProps> = ({
  serviceLabel,
  onChange,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const [images, setImages] = React.useState<FileRes[]>([]);
  const [videos, setVideos] = React.useState<string[]>([]);
  const { emit } = useTypedReactPubsub((keys) => keys.openLoginPopup);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-semibold">
        {t("Discover Our") + " " + serviceLabel}
      </p>

      <div className="flex gap-4 items-center px-8 py-4 border border-sky-300 border-dotted rounded">
        <div className="flex flex-col">
          <p className="text-xl">
            <span className="text-black">{t("Upload Photos")}</span>{" "}
            {t("or / and") +
              " " +
              t("video") +
              " " +
              t("to represent your service for your customers")}
          </p>
          <p>+ {t("Add atleast 3 photos")}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-xl">{t("Video")}</p>
        <div className="w-48">
          <AspectRatio ratio={3 / 4}>
            <div
              onClick={() => {
                emit({ uploadType: "video" });
              }}
              className="cursor-pointer justify-center w-full h-full items-center rounded-3xl bg-gray-50 border-[1px] flex"
            >
              <VideoAaddIcon className="text-4xl fill-primary text-primary" />
            </div>
          </AspectRatio>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-xl">{t("Photos")}</p>
        <div className="flex flex-wrap gap-y-4 gap-x-16">
          {[...Array(MAX_PRODUCTS_IMAGE)].map((_, i) => (
            <div className="w-48">
              <AspectRatio ratio={3 / 4}>
                <div
                  onClick={() => {
                    emit({
                      type: "img",
                    });
                  }}
                  className="cursor-pointer justify-center items-center h-full w-full rounded-3xl bg-gray-50 border-[1px] flex"
                >
                  {images[i] ? (
                    <>
                      <Image
                        className="w-full h-full object-cover"
                        key={i}
                        //@ts-ignore
                        src={images[i]}
                      />
                    </>
                  ) : (
                    <PhotoAddIcon className="text-4xl fill-primary text-primary" />
                  )}
                </div>
              </AspectRatio>
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
