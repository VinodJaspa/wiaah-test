import React from "react";
import { ServicesType, ServiceViewListItem } from "types";
import { runIfFn } from "../runIfFun";

export type getServiceViewType = "search" | "resaults" | "list" | "details";
type GetServiceViewKeyType = "SEARCH" | "RESAULTS" | "LIST" | "DETAILS";
export const getServiceView: Record<GetServiceViewKeyType, getServiceViewType> =
  {
    SEARCH: "search",
    RESAULTS: "resaults",
    LIST: "list",
    DETAILS: "details",
  };

export const ServicesTypeSwitcher: React.FC<{
  serviceType: ServicesType;
  servicesList: ServiceViewListItem[];
  get: getServiceViewType;
  fallbackComponent?: React.ReactNode;
}> = ({ get, serviceType, servicesList, fallbackComponent }) => {
  const serviceIdx = servicesList.findIndex((s) => s.slug === serviceType);
  const serviceFound = serviceIdx > -1;
  console.log("servicesSwitcher", serviceType, servicesList);
  return serviceFound
    ? runIfFn(
        get === "search"
          ? servicesList[serviceIdx].search
          : get === "resaults"
          ? servicesList[serviceIdx].searchResaults
          : get === "list"
          ? servicesList[serviceIdx].searchList
          : get === "details"
          ? servicesList[serviceIdx].details
          : null
      )
    : fallbackComponent
    ? runIfFn(fallbackComponent, {})
    : null;
};
