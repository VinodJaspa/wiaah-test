import React from "react";
import { AddNewShippingMothed, ShippingSettings } from "@UI";
export interface ShippingSettingsSectionProps {}

export const ShippingSettingsContext = React.createContext<{
  isAddNew: boolean;
  addNew: () => any;
  cancelAddNew: () => any;
  edit: (id: string) => any;
  editId?: string;
}>({
  isAddNew: false,
  addNew: () => {},
  cancelAddNew: () => {},
  edit: (id: string) => {},
});

export const ShippingSettingsSection: React.FC<
  ShippingSettingsSectionProps
> = ({}) => {
  const [id, setId] = React.useState<string | null>();

  function handleAddNew() {
    setId(null);
  }
  function handleCancelAddNew() {
    setId(undefined);
  }

  const isEdit = id === null ? undefined : id;

  return (
    <ShippingSettingsContext.Provider
      value={{
        isAddNew: id === null,
        addNew: handleAddNew,
        cancelAddNew: handleCancelAddNew,
        edit: (id) => setId(id),
        editId: isEdit,
      }}
    >
      {id !== undefined ? <AddNewShippingMothed /> : <ShippingSettings />}
    </ShippingSettingsContext.Provider>
  );
};
