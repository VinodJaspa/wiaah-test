import React from "react";
import { useTranslation } from "react-i18next";
import { NotificationData } from "types";
import { useDateDiff, Button, Avatar, EllipsisText, ClockIcon } from "ui";
export interface NotifiactionCardProps {
  notificationDetails: NotificationData;
}

export const NotifiactionCard: React.FC<NotifiactionCardProps> = ({
  notificationDetails,
}) => {
  try {
    const { type, by, id, message, attachment, creationDate } =
      notificationDetails;
    const { t } = useTranslation();
    const { getSince } = useDateDiff({
      from: new Date(creationDate),
      to: new Date(Date.now()),
    });
    const since = getSince();
    const TypeSpecificContent = () => {
      switch (type) {
        case "info":
          return attachment ? (
            <div className="w-full h-16">
              <img
                className="w-full h-full object-cover"
                src={attachment.src}
              />
            </div>
          ) : null;

        case "follow-request":
          return (
            <>
              <Button className="mr-4 ml-24">{t("Accept")}</Button>
              <Button colorScheme="gray">{t("Decline")}</Button>;
            </>
          );

        case "follow-notify":
          return <Button>{t("Follow")}</Button>;
        default:
          return null;
      }
    };

    return (
      <div
        className={`${
          type === "follow-request" ? "" : ""
        } flex items-center gap-4 justify-between max-w-full`}
      >
        <div className="flex w-full items-center gap-2">
          <Avatar className="min-w-[3rem]" src={by.thumbnail} name={by.name} />
          <div className="flex flex-col gap-2 w-full whitespace-pre-wrap">
            <EllipsisText maxLines={2}>
              <span className="font-bold">{by.name} </span>
              {message}
            </EllipsisText>
            <div className="flex items-center gap-2">
              <ClockIcon />
              <span className="text-gray-500 text-right font-bold">
                {since.value}
                {since.timeUnit.substring(0, 1)}
              </span>
            </div>
          </div>
        </div>
        <div className="min-w-[5.1rem] h-full flex justify-end">
          {TypeSpecificContent()}
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
    return <span>Error loading this notification</span>;
  }
};
