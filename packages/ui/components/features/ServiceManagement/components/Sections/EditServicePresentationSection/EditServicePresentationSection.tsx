import React from "react";
import { useTranslation } from "react-i18next";
import { SectionHeader, AspectRatioImage, EditIcon, Divider } from "ui";
import { mapArray } from "utils";

export interface EditServicePresentationSectionProps {}

export const EditServicePresentationSection: React.FC<
  EditServicePresentationSectionProps
> = () => {
  const { t } = useTranslation();

  const imagesData: {
    imageId: string;
    src: string;
  }[] = [
    {
      imageId: "132",
      src: "/post (1).jfif",
    },
    {
      imageId: "132",
      src: "/post (3).jfif",
    },
    {
      imageId: "132",
      src: "/post (4).jfif",
    },
    {
      imageId: "132",
      src: "/post (5).jfif",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      <SectionHeader sectionTitle={t("Edit Service Presentation")} />

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl">{t("video")}</p>
        <Divider />
        <div className="w-48 rounded-xl overflow-hidden">
          <AspectRatioImage
            className="group"
            alt=""
            ratio={3 / 4}
            src={"/post (2).jfif"}
          >
            <div className="absolute transition-opacity top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-50 pointer-events-none group-hover:pointer-events-auto flex justify-center items-center">
              <EditIcon className="text-4xl cursor-pointer text-white" />
            </div>
          </AspectRatioImage>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl">{t("Photos")}</p>
        <Divider />
        <div className="flex flex-wrap gap-8">
          {mapArray(imagesData, ({ imageId, src }, i) => (
            <div className="w-48 rounded-xl overflow-hidden">
              <AspectRatioImage
                className="group"
                alt=""
                ratio={3 / 4}
                src={src}
              >
                <div className="absolute transition-opacity top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-50 pointer-events-none group-hover:pointer-events-auto flex justify-center items-center">
                  <EditIcon className="text-4xl cursor-pointer text-white" />
                </div>
              </AspectRatioImage>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
