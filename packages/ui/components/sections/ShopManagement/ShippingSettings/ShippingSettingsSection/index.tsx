import React from "react";
import { AddNewShippingMothed, ShippingSettings } from "ui";
export interface ShippingSettingsSectionProps {}

export const ShippingSettingsContext = React.createContext({
  isAddNew: false,
  addNew: () => {},
  cancelAddNew: () => {},
});

export const ShippingSettingsSection: React.FC<ShippingSettingsSectionProps> =
  ({}) => {
    const [isAddNew, setIsAddNew] = React.useState<boolean>(false);

    function handleAddNew() {
      setIsAddNew(true);
    }
    function handleCancelAddNew() {
      setIsAddNew(false);
    }

    return (
      <ShippingSettingsContext.Provider
        value={{
          isAddNew,
          addNew: handleAddNew,
          cancelAddNew: handleCancelAddNew,
        }}
      >
        {isAddNew ? <AddNewShippingMothed /> : <ShippingSettings />}
      </ShippingSettingsContext.Provider>
    );
  };
