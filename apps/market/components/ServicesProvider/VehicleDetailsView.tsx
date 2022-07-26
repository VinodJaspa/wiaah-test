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
  HotelServiceRoomsSection,
  PopularAmenitiesSection,
  ServicesProviderDescriptionSection,
  Reviews,
  SectionTabType,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  ServiceReservastion,
  SectionsScrollTabList,
  useGetVehicleProviderDetailsQuery,
  DateInput,
  ResturantFindTableFilterDateDayComponent,
  Slider,
  VehicleSearchCard,
  CaruoselLeftArrow,
  CaruoselRightArrow,
  SearchFilter,
  Button,
} from "ui";
import { reviews } from "placeholder";
import { usePublishRef } from "state";
import { useTranslation } from "react-i18next";

export const VehicleServiceDetailsView: React.FC = () => {
  const { filters } = useSearchFilters();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetVehicleProviderDetailsQuery(filters);

  const { t } = useTranslation();

  const VehiclesRef = usePublishRef("vehicles");

  return (
    <div className="flex flex-col gap-8 py-8">
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
          <DateInput
            range
            className="w-[100%]"
            dayComponent={ResturantFindTableFilterDateDayComponent}
          />
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
            <div ref={VehiclesRef}>
              <Slider
                gap={8}
                itemsCount={3}
                leftArrowComponent={CaruoselLeftArrow}
                rightArrowComponent={CaruoselRightArrow}
              >
                {res
                  ? Array.isArray(res.data.vehicles)
                    ? res.data.vehicles.map((vehicle, i) => (
                        <div className="flex flex-col gap-2">
                          <VehicleSearchCard
                            showTotal={false}
                            key={i}
                            {...vehicle}
                          />
                          <SearchFilter
                            boldTitle
                            filters={[
                              {
                                filterTitle: "Cancellation policy",
                                filterDisplay: "text",
                                filterSlug: "cancellation_policy",
                                filterType: "radio",
                                filterOptions: [
                                  {
                                    optName: "Fully refundable before 28 Jul",
                                    optSlug: "fully_refundable_28jul",
                                  },
                                  {
                                    optName: "Fully refundable before 4 Aug",
                                    optSlug: "fully_refundable_4aug",
                                  },
                                ],
                              },
                            ]}
                          />
                          <Button className="w-fit">{t("Book now")}</Button>
                        </div>
                      ))
                    : null
                  : null}
              </Slider>
            </div>
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
