import {
  Avatar,
  Button,
  CheckmarkCircleFillIcon,
  HStack,
  useDateDiff,
} from "@UI";
import React from "react";
import { useTranslation } from "react-i18next";

import { isToday, isYesterday } from "@UI/../utils/src";
import { ExclimationOutlineCircleMark } from "@UI/components/partials/icons/ExclimationMark";
import { NotificationType } from "@features/API";
import { useRouting } from "routing";

export interface NotifiactionCardProps {
  type: NotificationType;
  username?: string;
  count?: number;
  orderId?: string;
  thumbnail?: string;
  createdAt: string;
  seen?: boolean;
  children?: React.ReactNode;
}

export const NotifiactionCard: React.FC<NotifiactionCardProps> = ({
  username,
  type,
  children,
  count,
  orderId,
  thumbnail,
  createdAt,
  seen,
}) => {
  try {
  const { t } = useTranslation();
    const { getSince } = useDateDiff({
      from: new Date(createdAt),
      to: new Date(Date.now()),
    });
    const since = getSince();

    const { visit } = useRouting();

    const showOn = (types: NotificationType[]) => types.includes(type);

    return (
      <div className={`flex items-center gap-3`}>
        <HStack>
          <span
            className={`${
              seen ? "" : "bg-red-500"
            } rounded-full w-[0.375rem] h-[0.375rem]`}
          ></span>
          <div className="w-[3.25rem] h-[3.25rem] flex justify-center items-center">
            {showOn([
              NotificationType.Follow,
              NotificationType.PostReacted,
              NotificationType.StoryReacted,
              NotificationType.CommentReacted,
              NotificationType.PostCommented,
              NotificationType.CommentReacted,
              NotificationType.CommentCommented,
              NotificationType.CommentMention,
              NotificationType.PostMention,
              NotificationType.StoryReacted,
            ]) ? (
              <Avatar src={thumbnail} />
            ) : null}

            {showOn([NotificationType.OrderCanceled]) ? (
              <ExclimationOutlineCircleMark className="text-red-500 text-4xl" />
            ) : null}

            {showOn([NotificationType.OrderDelivered]) ? (
              <CheckmarkCircleFillIcon className="text-primary text-4xl" />
            ) : null}

            {showOn([NotificationType.Info]) ? (
              <CheckmarkCircleFillIcon className="text-secondaryBlue text-4xl" />
            ) : null}
          </div>
        </HStack>
        <div className="text-[0.938rem] w-full flex flex-col gap-1">
          {(() => {
            switch (type) {
              case NotificationType.Follow:
                return (
                  <p>
                    <span className="text-primary">{username}</span>{" "}
                    <span>{t("is now following you")}</span>
                  </p>
                );
              case NotificationType.OrderCanceled:
                return (
                  <p>
                    <span className="font-semibold">
                      {t("Sorry! your order was cancelled")}{" "}
                    </span>
                    <span>
                      {t("Order ID")}:#{orderId}
                    </span>
                  </p>
                );

              case NotificationType.OrderDelivered:
                return (
                  <p>
                    <span className="font-semibold">
                      {t("Your order has been delivered")}{" "}
                    </span>
                    <span>
                      {t("Order ID")}:#{orderId}
                    </span>
                  </p>
                );
              // case NotificationType.OrderDelivered:
              //   return (
              //     <p>
              //       <span className="font-semibold">
              //         {t("Your order has been delivered")}{" "}
              //       </span>
              //       <span>
              //         {t("Order ID")}:#{orderId}
              //       </span>
              //     </p>
              //   );
              case NotificationType.PostReacted:
                return (
                  <p>
                    <span className="text-primary">{username}</span>{" "}
                    <span>{t("has liked your post")}</span>
                  </p>
                );

              case NotificationType.PostCommented:
                return (
                  <p>
                    <span className="text-primary">{username}</span>{" "}
                    <span>{t("has commented on your post")}</span>
                  </p>
                );

              case NotificationType.PostMention:
                return (
                  <p>
                    <span className="text-primary">{username}</span>{" "}
                    <span>{t("has mentioned you on a post")}</span>
                  </p>
                );
              case NotificationType.StoryReacted:
                return (
                  <p>
                    <span className="text-primary">{username}</span>{" "}
                    <span>{t("has liked your story")}</span>
                  </p>
                );

                default:
                  throw new Error("Invalid status"); 
            }
          })()}
          <p className="text-xs text-[#7E7E7E]">
            {isToday(new Date(createdAt)) || isYesterday(new Date(createdAt))
              ? new Date(createdAt).toLocaleTimeString("en-us", {
                  hour: "2-digit",
                  hour12: true,
                  minute: "2-digit",
                })
              : new Date(createdAt).toLocaleDateString("en-us", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
          </p>
        </div>
        {showOn([NotificationType.Follow]) ? (
          <Button className="text-xs capitalize mr-2" colorScheme="darkbrown">
            {t("follow")}
          </Button>
        ) : null}
      </div>
    );
  } catch (err) {
    console.error(err);
    return <span>Error loading this notification</span>;
  }
};
