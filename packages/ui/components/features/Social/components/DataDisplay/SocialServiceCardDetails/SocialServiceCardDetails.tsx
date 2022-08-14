import React from "react";
import { useTranslation } from "react-i18next";
import { ProfileInfo } from "types";
import { NumberShortner } from "utils";
import {
  Rate,
  Avatar,
  Button,
  PriceDisplay,
  UnDiscountedPriceDisplay,
  SocialServiceDetailsModal,
} from "ui";

export interface SocialServiceCardDetailsProps {
  user: ProfileInfo;
  title: string;
  rating: number;
  price: number;
  oldPrice: number;
  views: number;
  onFollow?: () => any;
  onBook?: () => any;
}

export const SocialServiceCardDetails: React.FC<
  SocialServiceCardDetailsProps
> = ({ oldPrice, price, rating, title, user, views, onFollow, onBook }) => {
  const { t } = useTranslation();
  function handleFollowClick() {
    onFollow && onFollow();
  }
  return (
    <>
      <div className="p-4 items-start flex bg-primary w-full flex-col">
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="text-white flex items-center gap-2" color="white">
            <Avatar
              className="bg-black"
              src={user.thumbnail}
              name={user.name}
            />
            <p>{user.name}</p>
          </div>
          <Button onClick={handleFollowClick}>{t("follow")}</Button>
        </div>
        <p className="text-left text-white text-xl font-semibold">{title}</p>
        <div className="flex items-center gap-1 font-semibold text-white">
          <PriceDisplay price={price} />
          {oldPrice && (
            <UnDiscountedPriceDisplay amount={price} discount={10} />
          )}
        </div>
        <Rate allowHalf rating={rating} className="" />
        <div className="flex w-full justify-between items-start gap-2">
          <p className="text-white font-semibold text-xl">
            {NumberShortner(views)} {t("Views")}
          </p>
        </div>
      </div>
    </>
  );
};
