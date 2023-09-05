import { AccountSettingsSection } from "@UI";
import React from "react";

export const AccountGeneralView: React.FC<{ accountId: string }> = ({
  accountId,
}) => {
  return <AccountSettingsSection accountId={accountId} />;
};
