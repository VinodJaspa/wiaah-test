import { ServicePostMetaDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  PostAttachment,
  Slider,
  AspectRatio,
  PriceDisplay,
  Button,
  Rate,
  LocationOutlineIcon,
  UserProfile,
} from "ui";

export interface SocialServicePostMetaDataCardProps
  extends ServicePostMetaDataType {
  onClick?: (id: string) => any;
}

export const SocialServicePostMetaDataCard: React.FC<
  SocialServicePostMetaDataCardProps
> = ({
  id,
  label,
  name,
  attachments,
  onClick,
  location,
  price,
  rate,
  type,
  reviews,
  user,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full">
      <div
        {...props}
        onClick={() => onClick && onClick(id)}
        className="relative w-full bg-transparent"
      >
        <AspectRatio ratio={3 / 4}>
          <Slider>
            {Array.isArray(attachments)
              ? attachments.map((att) => <PostAttachment blur {...att} />)
              : null}
          </Slider>
        </AspectRatio>
        {user ? (
          <div className="absolute bottom-0 left-0 w-full p-2 text-white bg-gradient-to-t from-black  to-transparent">
            <UserProfile
              user={{
                name: user.name,
                activityType: user.profession,
                userPhotoSrc: user.thumbnail,
                verified: user.verified,
              }}
            />
          </div>
        ) : null}
        <div className="cursor-pointer absolute top-4 left-0 flex flex-col w-full text-lg bg-gray-500 bg-opacity-50 p-2 text-white">
          {/* <p className="font-semibold  lg:text-2xl ">{name}</p> */}
          <p className="w-full text-lg font-bold text-right text-primary">
            {">>"} {t(label)} {"<<"}
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-col w-full py-2 px-4">
        <div className="flex font-bold text-lg justify-between gap-4 w-full">
          <p>{name}</p>
          <PriceDisplay price={price} />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Rate rating={rate} />
              <p>
                {reviews} {t("Reviews")}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <LocationOutlineIcon />
              <p>{location ? location.country || "" : null}</p>
            </div>
          </div>
          <Button>{t("View")}</Button>
        </div>
      </div>
    </div>
  );
};
