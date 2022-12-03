import { useRecoilValue, useSetRecoilState } from "recoil";
import { BookedServicesState, BookedService } from "state";
import { FilterAndAddToArray } from "utils";

export const useGetBookedServicesState = () => {
  const bookedServices = useRecoilValue(BookedServicesState);

  return {
    bookedServices,
  };
};

export const useSetBookedServicesState = () => {
  const setBookedServices = useSetRecoilState(BookedServicesState);

  function addService(service: BookedService) {
    setBookedServices((state) => {
      return FilterAndAddToArray(state, service, "exclude", "id");
    });
  }

  return {
    addService,
  };
};
