import { ServicePostMetaDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { PostAttachment, Slider, AspectRatio } from "ui";

export interface SocialServicePostMetaDataCardProps
  extends ServicePostMetaDataType {
  onClick?: (id: string) => any;
}

export const SocialServicePostMetaDataCard: React.FC<
  SocialServicePostMetaDataCardProps
> = ({ id, label, name, attachments, onClick }) => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full bg-black">
      <AspectRatio ratio={3 / 4}>
        <Slider>
          {Array.isArray(attachments)
            ? attachments.map((att) => <PostAttachment {...att} />)
            : null}
        </Slider>
      </AspectRatio>
      <div className="cursor-pointer absolute top-0 left-0 flex flex-col w-full text-lg bg-gray-500 bg-opacity-50 p-2 text-white">
        <p className="font-semibold  lg:text-2xl ">{name}</p>
        <p className="w-full text-lg font-bold text-right text-primary">
          {">>"} {t(label)} {"<<"}
        </p>
      </div>
    </div>
  );
};
