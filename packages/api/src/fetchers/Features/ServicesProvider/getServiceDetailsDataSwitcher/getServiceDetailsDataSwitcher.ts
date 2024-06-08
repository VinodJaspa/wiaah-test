import { ServicesType } from "types";
import {
  getServicesProviderDataFetcher,
  getResturantServiceDetialsData,
  getHealthCenterDetailsFetcher,
  getVehicleServiceProviderDetailsFetcher,
  getBeautyCenterDetailsDataFetcher,
} from "api";

export const getServiceDetailsDataSwitcher = (serviceType: ServicesType,id:string) => {
  switch (serviceType) {
    case "hotel":
      return getServicesProviderDataFetcher({id:id});
    case "restaurant":
      return getResturantServiceDetialsData(id);
    case "health_center":
      return getHealthCenterDetailsFetcher({});
    case "vehicle":
      return getVehicleServiceProviderDetailsFetcher({});
    case "beauty_center":
      return getBeautyCenterDetailsDataFetcher(id);
    default:
      return null;
  }
};
