import {
  AccountDeletionModal,
  AccountVerifciationForm,
  useAdminGetAccountVerifficationRequest,
} from "@UI";
import React from "react";

export const AccountVerifciation: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { data } = useAdminGetAccountVerifficationRequest(accountId);

  return (
    <div className="w-full">
      <AccountVerifciationForm
        onSubmit={() => {}}
        readOnly
        initialValue={data}
      />
    </div>
  );
};
