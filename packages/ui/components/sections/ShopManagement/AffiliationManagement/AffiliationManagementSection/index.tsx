import { useCreateNewAffiliationMutation } from "@features/Affiliation";
import React from "react";
import { AffiliationListSection } from "../AffiliationsListSection";
import { NewAffiliationLinkSection } from "../NewAffiliationLinkSection";
export interface AffiliationManagementSection {}

export const AffiliationManagementContext = React.createContext({
  isAddNew: false,
  addNew: () => {},
  cancelNew: () => {},
});

export const AffiliationManagementSection: React.FC<
  AffiliationManagementSection
> = () => {
  const { mutate } = useCreateNewAffiliationMutation();
  const [isAddNew, setIsAddNew] = React.useState<boolean>(false);

  function handleAddNew() {
    setIsAddNew(true);
  }

  function handleCancelNew() {
    setIsAddNew(false);
    console.log(isAddNew);
  }

  return (
    <AffiliationManagementContext.Provider
      value={{ isAddNew, addNew: handleAddNew, cancelNew: handleCancelNew }}
    >
      {isAddNew ? (
        <NewAffiliationLinkSection
          onSubmit={(v) => {
            mutate({ args: v });
          }}
        />
      ) : (
        <AffiliationListSection />
      )}
    </AffiliationManagementContext.Provider>
  );
};
