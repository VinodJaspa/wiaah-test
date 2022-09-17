import React from "react";
import { AddNewService } from "./AddNewService";
import { MyServicesList } from "./MyServicesList";
export * from "./ServiceGeneralDetails";
export * from "./IncludedServices";
export * from "./ExtraServiceOptions";
export * from "./RestaurantServiceDetailsForm";
export * from "./HealthCenterServiceDetailsForm";
export * from "./VehicleServiceDetailsForm";
export * from "./BeautyCenterServiceDetailsForm";
export * from "./ServicePoliciesSection";
export * from "./RestaruantIncludedServicesSection";
export * from "./HolidayRentalsGeneralDetailsForm";
export * from "./HealthCenterIncludedServices";
export * from "./AddNewService";
export * from "./MyServicesList";
export * from "./DiscoverOurServiceForm";

interface MyServicesCtxValues {
  AddingNew: boolean;
  AddNewService: () => any;
  CancelAddingNewService: () => any;
}

export const MyServicesCtx = React.createContext<MyServicesCtxValues>({
  AddingNew: false,
  AddNewService: () => {},
  CancelAddingNewService: () => {},
});

export const MyServicesSection: React.FC = () => {
  const [AddingNew, setAddingNew] = React.useState<boolean>(false);

  function handleAddNewService() {
    setAddingNew(true);
  }
  function handleCancelAddingNewService() {
    setAddingNew(false);
  }

  return (
    <MyServicesCtx.Provider
      value={{
        AddingNew,
        AddNewService: handleAddNewService,
        CancelAddingNewService: handleCancelAddingNewService,
      }}
    >
      {AddingNew ? <AddNewService /> : <MyServicesList />}
    </MyServicesCtx.Provider>
  );
};
