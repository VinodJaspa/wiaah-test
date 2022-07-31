import React from "react";
import {
  ServicesProviderHeader,
  SpinnerFallback,
  useSearchFilters,
  Divider,
  ServiceReachOutSection,
  ServiceOnMapLocationSection,
  ServicePoliciesSection,
  ServiceWorkingHoursSection,
  ServicesProviderDescriptionSection,
  Reviews,
  SectionTabType,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  SectionsScrollTabList,
  useGetVehicleProviderDetailsQuery,
  Slider,
  VehicleSearchCard,
  CaruoselLeftArrow,
  CaruoselRightArrow,
  SearchFilter,
  Button,
  DateAndTimeInput,
  ServiceCancelationPolicyInput,
} from "ui";
import { reviews } from "placeholder";
import { usePublishRef } from "state";
import { useTranslation } from "react-i18next";
import { useResponsive } from "hooks";
import { VehicleSearchData } from "api";

export const VehicleServiceDetailsView: React.FC = () => {
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetVehicleProviderDetailsQuery(filters);

  const { t } = useTranslation();
  const { isMobile, isTablet } = useResponsive();

  const VehiclesRef = usePublishRef("vehicles");

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? <ServicesProviderHeader {...res.data} /> : null}
      </SpinnerFallback>
      <Divider />
      <ServicePresentationCarosuel
        data={res ? res.data.presintations || [] : []}
      />
      <SectionsScrollTabList tabs={ServicesProviderTabs} />
      <StaticSideBarWrapper
        sidebar={
          <div className="flex flex-col gap-2 text-xl">
            <DateAndTimeInput
              onDateChange={() => {}}
              dateLabel={t("Pick-up Date")}
            />
            <DateAndTimeInput
              onDateChange={() => {}}
              dateLabel={t("Return Date")}
            />
          </div>
        }
      >
        {res ? (
          <>
            <ServicesProviderDescriptionSection
              description={res.data.description}
              name={res.data.name}
              proprtyType={res.data.proprtyType}
            />
            <Divider />
            <ServiceReachOutSection
              email={res.data.email}
              location={res.data.location}
              telephone={res.data.telephone}
            />
            <VehiclesSelectableList vehicles={res.data.vehicles || []} />
            <ServiceWorkingHoursSection workingDays={res.data.workingDays} />
            <ServicePoliciesSection policies={res.data.policies} />
            <ServiceOnMapLocationSection location={res.data.location} />
          </>
        ) : null}
        <Reviews id={res?.data.id || ""} reviews={reviews} />
      </StaticSideBarWrapper>
    </div>
  );
};

const VehiclesSelectableList: React.FC<{ vehicles: VehicleSearchData[] }> = ({
  vehicles,
}) => {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useResponsive();
  const VehiclesRef = usePublishRef((keys) => keys.vehicle);
  const [selectedVehicles, setSelectedVehicles] = React.useState<string[]>([]);

  return (
    <div ref={VehiclesRef}>
      <Slider
        gap={16}
        itemsCount={isMobile ? 1 : isTablet ? 2 : 3}
        leftArrowComponent={CaruoselLeftArrow}
        rightArrowComponent={CaruoselRightArrow}
      >
        {vehicles
          ? Array.isArray(vehicles)
            ? vehicles.map((vehicle, i) => {
                const selected = selectedVehicles.includes(vehicle.id);
                function handleSelect(id: string) {
                  if (selected) {
                  } else {
                    setSelectedVehicles((state) => [...state, id]);
                  }
                }

                function handleUnSelect(id: string) {
                  if (selected) {
                    setSelectedVehicles((state) =>
                      state.filter((vehicleId) => vehicleId !== id)
                    );
                  }
                }

                return (
                  <div className="flex flex-col gap-2">
                    <VehicleSearchCard showTotal={false} key={i} {...vehicle} />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">{t("Cancelation policy")}</p>
                      {vehicle.cancelationPolicies.map((policy, i) => (
                        <ServiceCancelationPolicyInput
                          {...policy}
                          name="cancelationPolicy"
                          onSelected={() => {}}
                          key={`${i}-${policy.id}`}
                        />
                      ))}
                    </div>
                    <Button
                      onClick={() =>
                        selected
                          ? handleUnSelect(vehicle.id)
                          : handleSelect(vehicle.id)
                      }
                      outline={selected}
                      className="self-end w-fit"
                    >
                      {selected ? t("Selected") : t("Select")}
                    </Button>
                  </div>
                );
              })
            : null
          : null}
      </Slider>
    </div>
  );
};

const ServicesProviderTabs: SectionTabType[] = [
  {
    slug: "description",
    name: "Description",
  },
  {
    name: "Contact",
    slug: "contact",
  },
  {
    slug: "policies",
    name: "Policies",
  },
  {
    name: "Working hours",
    slug: "workingHours",
  },
  {
    slug: "vehicles",
    name: "Vehicles",
  },
  {
    slug: "localization",
    name: "Localization",
  },
  {
    slug: "reviews",
    name: "Customer reviews",
  },
];
