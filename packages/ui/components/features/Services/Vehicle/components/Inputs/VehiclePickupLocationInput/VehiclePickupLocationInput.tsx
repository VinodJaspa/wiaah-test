import { VehiclePickupLocation } from "api";
import { usePagination } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  InputGroup,
  InputLeftElement,
  SearchIcon,
  InputSuggestions,
  Input,
  useSearchFilters,
  useGetVehiclePickUpLocationQuery,
  SpinnerFallback,
  PickupLocationSuggistionCard,
} from "@UI";

export interface VehiclePickupLocationInputProps {}

export const VehiclePickupLocationInput: React.FC<
  VehiclePickupLocationInputProps
> = ({}) => {
const { t } = useTranslation();
  const { filters } = useSearchFilters();
  const { take, page } = usePagination();
  const [locationSuggsions, setLocationSuggistions] = React.useState<
    VehiclePickupLocation[]
  >([]);
  const { isLoading, isError } = useGetVehiclePickUpLocationQuery(
    { page, take },
    filters,
    {
      onSuccess: (res) => {
        try {
          if (res.data) {
            if (res.data?.length > 0)
              setLocationSuggistions(res.data.map((d) => ({ ...d })));
          }
        } catch {}
      },
    },
  );
  return (
    <InputGroup className="text-black h-12 w-full rounded bg-white">
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>
      <Input placeholder={t("Pick-up Location")} />
      <InputSuggestions className="bg-white">
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {Array.isArray(locationSuggsions)
            ? locationSuggsions.map((location) =>
                location ? (
                  <PickupLocationSuggistionCard {...location} />
                ) : null,
              )
            : null}
        </SpinnerFallback>
      </InputSuggestions>
    </InputGroup>
  );
};
