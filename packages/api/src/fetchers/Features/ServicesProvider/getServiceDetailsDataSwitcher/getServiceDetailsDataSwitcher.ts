import { ServicesType } from "types";
import {
  getServicesProviderDataFetcher,
  getResturantServiceDetialsData,
  getHealthCenterDetailsFetcher,
  getVehicleServiceProviderDetailsFetcher,
  getBeautyCenterDetailsDataFetcher,
} from "api";

export const getServiceDetailsDataSwitcher = (serviceType: ServicesType) => {
  switch (serviceType) {
    case "hotel":
      return getServicesProviderDataFetcher;
    case "resturant":
      return getResturantServiceDetialsData;
    case "health_center":
      return getHealthCenterDetailsFetcher;
    case "vehicle":
      return getVehicleServiceProviderDetailsFetcher;
    case "beauty_center":
      return getBeautyCenterDetailsDataFetcher;
    default:
      return null;
  }
};
