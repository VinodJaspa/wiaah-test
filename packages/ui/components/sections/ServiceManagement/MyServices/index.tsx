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
  ServiceIdFormState: string | boolean;
  AddNewService: () => any;
  CancelAddingNewService: () => any;
  EditService: (id: string) => any;
}

export const MyServicesCtx = React.createContext<MyServicesCtxValues>({
  ServiceIdFormState: false,
  AddNewService: () => {},
  EditService: () => {},
  CancelAddingNewService: () => {},
});

export const MyServicesSection: React.FC = () => {
  const [state, setState] = React.useState<string | boolean>(false);

  return (
    <MyServicesCtx.Provider
      value={{
        ServiceIdFormState: state,
        EditService: (id) => setState(id),
        CancelAddingNewService: () => {
          setState(false);
        },
        AddNewService: () => setState(true),
      }}
    >
      {state === false ? <MyServicesList /> : <AddNewService />}
    </MyServicesCtx.Provider>
  );
};
