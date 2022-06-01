import React from "react";
import { TransactionStatusEnum } from "types";
import { PendingIcon, FailedIcon, SuccessIcon } from "ui";

export interface StatusProps {
  status: TransactionStatusEnum;
}

export const Status: React.FC<StatusProps> = ({ status }) => {
  switch (status) {
    case "completed":
      return <SuccessIcon />;
    case "failed":
      return <FailedIcon />;
    case "pending":
      return <PendingIcon />;
    default:
      return null;
  }
};
