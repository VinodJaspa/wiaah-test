import { Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDateDiff } from "../../Hooks";

export interface DisplayPostedSinceProps {
  since: string;
  ago?: boolean;
}

export const DisplayPostedSince: React.FC<DisplayPostedSinceProps> = ({
  since,
  ago,
}) => {
  const { t } = useTranslation();
  const { getSince } = useDateDiff({
    from: new Date(since),
    to: new Date(Date.now()),
  });
  const Since = getSince();
  return (
    <Text data-testid="PostCreatedSince" px="1">
      {Since.value} {Since.timeUnit} {ago && t("ago", "ago")}
    </Text>
  );
};
