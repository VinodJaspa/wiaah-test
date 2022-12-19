import React from "react";
import { TransactionStatusEnum } from "types";
import { PendingIcon, FailedIcon, SuccessIcon } from "@UI";

export type StatusEnum = TransactionStatusEnum;

export interface StatusProps {
  status: StatusEnum;
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
