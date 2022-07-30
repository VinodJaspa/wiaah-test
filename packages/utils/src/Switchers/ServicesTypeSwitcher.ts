import React from "react";
import { ServicesType, ServiceViewListItem } from "types";
import { runIfFn } from "../runIfFun";

export type getServiceViewType =
  | "search"
  | "resaults"
  | "list"
  | "horizontalList"
  | "details";
type GetServiceViewKeyType =
  | "SEARCH"
  | "RESAULTS"
  | "LIST"
  | "DETAILS"
  | "HORIZONTAL_LIST";
export const getServiceView: Record<GetServiceViewKeyType, getServiceViewType> =
  {
    SEARCH: "search",
    RESAULTS: "resaults",
    LIST: "list",
    DETAILS: "details",
    HORIZONTAL_LIST: "horizontalList",
  };

export const ServicesTypeSwitcher: React.FC<{
  serviceType: ServicesType;
  servicesList: ServiceViewListItem[];
  get: getServiceViewType;
  fallbackComponent?: React.ReactNode;
  props?: object;
}> = ({ get, serviceType, servicesList, fallbackComponent, props = {} }) => {
  const serviceIdx = servicesList.findIndex((s) => s.slug === serviceType);
  const serviceFound = serviceIdx > -1;

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
          : get === "horizontalList"
          ? servicesList[serviceIdx].searchHorizontalList
          : null,
        props
      )
    : fallbackComponent
    ? runIfFn(fallbackComponent, {})
    : null;
};
