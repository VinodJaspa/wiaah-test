import { Divider, Stack } from "@partials";
import { AffiliationHistorySection, AffiliationListSection } from "@UI";
import React from "react";

export const AccountAffiliation: React.FC<{ accountId: string }> = ({
  accountId,
}) => {
  return (
    <Stack col divider={<Divider />}>
      <AffiliationListSection />
      <AffiliationHistorySection />
    </Stack>
  );
};
