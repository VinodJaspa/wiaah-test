import { atom, selector } from "recoil";
import { ResturantsDataState } from "../../../Services";
import { FocusedMapItemIdState } from "./FocusedMapItemIdState";

export const servicesOnMapState = atom<onMapLocation[]>({
  default: [],
  key: `servicesOnMapState_${Date.now()}`,
});

export type onMapLocation = {
  title: string;
  price: number;
  lat: number;
  lng: number;
  id: string;
};

export const onMapLocationsState = selector<onMapLocation[]>({
  get({ get }) {
    const focusedItemId = get(FocusedMapItemIdState);
    const resturants = get(ResturantsDataState);
    const services = get(servicesOnMapState);
    const alllocations: onMapLocation[] = [...services].flat();
    const focusedItem = alllocations.find((loc) => loc.id === focusedItemId);
    if (focusedItem) return [focusedItem];
    return alllocations;
  },
  key: `onMapLocationsState_${Date.now()}`, // Unique key using current timestamp
});
