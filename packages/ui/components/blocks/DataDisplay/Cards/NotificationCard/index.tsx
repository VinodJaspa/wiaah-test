import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { NotificationData } from "types";
import { useDateDiff } from "ui";
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
            <Box>
              <AspectRatio w="3rem" ratio={1 / 1}>
                <Image src={attachment.src} />
              </AspectRatio>
            </Box>
          ) : null;

        case "follow-request":
          return <Button>{t("accept", "accept")}</Button>;

        case "follow-notify":
          return <Button>{t("follow", "Follow")}</Button>;
        default:
          return null;
      }
    };

    return (
      <HStack justify={"space-between"} w={"25rem"}>
        <HStack>
          <Avatar bgColor={"black"} src={by.thumbnail} name={by.name} />
          <Text>
            <span className="font-bold">{by.name} </span>
            {message}{" "}
            <span className="text-gray">
              {since.value}
              {since.timeUnit.substring(0, 1)}
            </span>
          </Text>
        </HStack>
        {TypeSpecificContent()}
      </HStack>
    );
  } catch (err) {
    console.error(err);
    return <Text>Error loading this notification</Text>;
  }
};
