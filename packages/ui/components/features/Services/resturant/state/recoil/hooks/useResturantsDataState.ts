import { useRecoilValue, useSetRecoilState } from "recoil";
import { ResturantsDataState } from "../atoms";

export const useSetResturantsDataState = () => {
  const setResturants = useSetRecoilState(ResturantsDataState);

  return {
    setResturants,
  };
};

export const useResturantsDataState = () => {
  const resturants = useRecoilValue(ResturantsDataState);
  return {
    resturants,
  };
};
