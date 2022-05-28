import React from "react";
import { useTranslation } from "react-i18next";
import { useDateDiff } from "ui";

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
    <span className="px-1" data-testid="PostCreatedSince">
      {Since.value} {Since.timeUnit} {ago && t("ago", "ago")}
    </span>
  );
};
