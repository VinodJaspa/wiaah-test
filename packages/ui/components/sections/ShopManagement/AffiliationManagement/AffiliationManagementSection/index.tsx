import { useCreateNewAffiliationMutation } from "@features/Affiliation";
import React from "react";
import { AffiliationListSection } from "../AffiliationsListSection";
import { AffiliationForm } from "../NewAffiliationLinkSection";
export interface AffiliationManagementSection {}

export const AffiliationManagementContext = React.createContext({
  isAddNew: false,
  addNew: () => {},
  cancelNew: () => {},
  edit: (id: string) => {},
});

export const AffiliationManagementSection: React.FC<
  AffiliationManagementSection
> = () => {
  const { mutate } = useCreateNewAffiliationMutation();
  const [isAddNew, setIsAddNew] = React.useState<boolean>(false);
  const [editId, setEditId] = React.useState<string | true>();

  function handleAddNew() {
    setIsAddNew(true);
  }

  function handleCancelNew() {
    setIsAddNew(false);
    console.log(isAddNew);
  }

  function Edit(id: string) {
    setEditId(id);
  }

  return (
    <AffiliationManagementContext.Provider
      value={{
        isAddNew,
        addNew: handleAddNew,
        cancelNew: handleCancelNew,
        edit: Edit,
      }}
    >
      {isAddNew || typeof editId === "string" ? (
        <AffiliationForm
          onSubmit={(v) => {
            mutate({ args: v });
          }}
          onBack={() => handleCancelNew()}
        />
      ) : (
        <AffiliationListSection />
      )}
    </AffiliationManagementContext.Provider>
  );
};
