import React from "react";
import { ServicesType, ServiceViewListItem } from "types";
import { runIfFn } from "../runIfFun";
import { NotFound } from "ui";

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
}> = ({
  get,
  serviceType,
  servicesList,
  fallbackComponent = NotFound,
  props = {},
}) => {
  const serviceIdx = servicesList.findIndex((s) => s.slug === serviceType);
  const serviceFound = serviceIdx > -1;

  // if (!serviceFound) return runIfFn(fallbackComponent, {});

  const comp = serviceFound
    ? get === "search"
      ? servicesList[serviceIdx].search
      : get === "resaults"
      ? servicesList[serviceIdx].searchResaults
      : get === "list"
      ? servicesList[serviceIdx].searchList
      : get === "details"
      ? servicesList[serviceIdx].details
      : get === "horizontalList"
      ? servicesList[serviceIdx].searchHorizontalList
      : null
    : null;

  return serviceFound
    ? runIfFn(comp ? comp : fallbackComponent, props)
    : runIfFn(fallbackComponent, {});
};
