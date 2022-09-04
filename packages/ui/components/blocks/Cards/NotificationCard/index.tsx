import React from "react";
import { useTranslation } from "react-i18next";
import { NotificationData } from "types";
import { useDateDiff, Button, Avatar } from "ui";
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
            <div className="w-12 h-12">
              <img className="w-12 h-12 object-cover" src={attachment.src} />
            </div>
          ) : null;

        case "follow-request":
          return (
            <div className="flex w-full gap-4 items-end">
              <Button>{t("Accept")}</Button>
              <Button colorScheme="gray">{t("Decline")}</Button>;
            </div>
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
          type === "follow-request" ? "flex-col" : ""
        } flex items-center gap-2 justify-between max-w-full`}
      >
        <div className="flex w-full items-center gap-2">
          <Avatar photoSrc={by.thumbnail} name={by.name} />
          <p className="whitespace-pre-wrap">
            <span className="font-bold">{by.name} </span>
            {message}{" "}
            <span className="text-gray-500">
              {since.value}
              {since.timeUnit.substring(0, 1)}
            </span>
          </p>
        </div>
        <div className="min-w-[3rem]">{TypeSpecificContent()}</div>
      </div>
    );
  } catch (err) {
    console.error(err);
    return <span>Error loading this notification</span>;
  }
};
