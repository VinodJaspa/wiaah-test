import { BookingsHistorySection } from "@UI";
import React from "react";

export const AccountBookingsHistory: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  return <BookingsHistorySection accountId={accountId} />;
};
