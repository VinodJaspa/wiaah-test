import React from "react";
import { useTranslation } from "react-i18next";
import { HiDotsHorizontal, HiOutlineHeart } from "react-icons/hi";
import { CashBack, HtmlDivProps, PostAttachmentTypes } from "types";
import { useReactPubsub } from "react-pubsub";
import { Interactions } from "types";
import {
  PostAttachment,
  CashbackBadge,
  PostAttachmentProps,
  CalenderIcon,
  ExclamationCircleIcon,
  SocialServiceDetailsModal,
  ModalExtendedWrapper,
  ModalButton,
} from "ui";

export interface SocialServicePostAttachmentsProps {
  cashback?: CashBack;
  src?: string;
  type?: PostAttachmentTypes;
  alt?: string;
  discount?: CashBack;
  productType: "product" | "service";
  onInteraction?: (interaction: Interactions) => any;
  showbook?: boolean;
  attachmentProps?: PostAttachmentProps;
  innerProps?: HtmlDivProps;
  minimal?: boolean;
}

export const SocialServicePostAttachments: React.FC<
  SocialServicePostAttachmentsProps
> = ({
  alt,
  attachmentProps,
  cashback,
  discount,
  innerProps,
  onInteraction,
  src,
  type,
}) => {
  const { emit } = useReactPubsub((keys) => keys.serviceModal);
  const { t } = useTranslation();
  return (
    <div className="max-w-full h-full relative bg-black" {...innerProps}>
      <PostAttachment
        src={src || ""}
        type={type || "image"}
        alt={alt}
        {...attachmentProps}
      />
      <div className="w-full h-full absolute top-0 left-0 p-1 flex justify-between pointer-events-none z-10">
        <div className="h-fit bg-white rounded-lg px-1 flex items-center justify-center">
          <HiDotsHorizontal className="cursor-pointer text-sm md:text-xl rounded-lg pointer-events-auto" />
        </div>
        <div className="flex transform -translate-x-1/2 justify-between self-center items-center flex-col py-1 absolute top0 left-1/2 h-full">
          {cashback && (
            <CashbackBadge
              amount={cashback.value}
              type={cashback.unit === "$" ? "cash" : "percent"}
            />
          )}
        </div>
        <div className="flex items-end h-full justify-between flex-col">
          <div className="flex text-gray-700 gap-2 flex-col">
            <div
              className="flex items-center max-w-fit p-1 bg-white justify-center rounded-full pointer-events-auto cursor-pointer"
              onClick={() => onInteraction && onInteraction("saveToWL")}
            >
              <HiOutlineHeart className="text-sm md:text-xl" />
            </div>

            <div
              className="flex items-center max-w-fit p-1 bg-white justify-center rounded-full pointer-events-auto cursor-pointer"
              onClick={() => emit({ id: "test" })}
            >
              <CalenderIcon className="text-sm md:text-xl" />
            </div>
          </div>
          {discount ? (
            <div className="flex px-2 gap-2 bg-red-500 text-white rounded-lg font-semibold text-sm md:text-lg items-center">
              <p>
                {discount.value}
                {discount.unit}
              </p>
              <p className="py-1">{t("OFF")}</p>
            </div>
          ) : (
            <p className="hidden">.</p>
          )}
        </div>
      </div>
    </div>
  );
};
