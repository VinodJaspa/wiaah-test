import { useRecoilValue, useSetRecoilState } from "recoil";
import { onMapLocationsState } from "../atoms";

export const useSetMapLocationsState = () => {
  const setLocations = (...props: any) => {};

  return {
    setLocations,
  };
};

export const useGetMapLocationsState = () => {
  const locations = useRecoilValue(onMapLocationsState);

  return {
    locations,
  };
};
