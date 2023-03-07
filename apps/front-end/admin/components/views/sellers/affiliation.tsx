import { Divider, Stack } from "@partials";
import { AffiliationHistorySection, AffiliationListSection } from "@UI";
import React from "react";

export const AccountAffiliation: React.FC<{
  accountId: string;
  showList?: boolean;
}> = ({ accountId, showList }) => {
  return (
    <Stack col divider={<Divider />}>
      {showList ? <AffiliationListSection /> : null}
      <AffiliationHistorySection />
    </Stack>
  );
};
