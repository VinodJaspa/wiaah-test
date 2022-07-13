import { atom, selector } from "recoil";
import { ResturantsDataState } from "../../../Services";
import { FocusedMapItemIdState } from "./FocusedMapItemIdState";

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
    // const hotels = get(HotelsDataState)
    const alllocations: onMapLocation[] = [
      resturants.map(
        ({
          name: title,
          averagePrice: price,
          id,
          location: {
            cords: { lat, lng },
          },
        }) => ({ id, lat, lng, price, title })
      ),
    ].flat();
    const focusedItem = alllocations.find((loc) => loc.id === focusedItemId);
    if (focusedItem) return [focusedItem];
    return alllocations;
  },
  key: "onMapLocationsState",
});
