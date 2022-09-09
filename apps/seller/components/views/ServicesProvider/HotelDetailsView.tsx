import React from "react";
import {
  Tabs,
  TabList,
  TabTitle,
  TabsHeader,
  useGetServicesProviderQuery,
  useSearchFilters,
  Divider,
  ServiceReachOutSection,
  ServiceOnMapLocalizationSection,
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
  SpinnerFallback,
} from "ui";
import { reviews } from "placeholder";
import { useResponsive } from "hooks";
import { useTranslation } from "react-i18next";

export const HotelDetailsView: React.FC = () => {
  const { filters } = useSearchFilters();
  const { isMobile } = useResponsive();
  const {
    data: res,
    isError,
    isLoading,
  } = useGetServicesProviderQuery(filters);
  const { t } = useTranslation();

  console.log({ isLoading, isError, res });

  const ServicesProviderTabs: { name: string; component: React.ReactNode }[] =
    React.useMemo(
      () => [
        {
          name: "Description",
          component: (
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? (
                <div className="flex flex-col gap-[3.75rem]">
                  <ServicesProviderDescriptionSection
                    description={res.data.description}
                    bathrooms={2}
                    bedrooms={3}
                    bikes={3}
                    cars={2}
                    pets={1}
                  />
                  <PopularAmenitiesSection
                    cols={3}
                    amenities={res.data.PopularAmenities || []}
                  />
                </div>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Contact",
          component: (
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? (
                <>
                  <ServiceReachOutSection
                    email={res.data.email}
                    location={res.data.location}
                    telephone={res.data.telephone}
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Policies",
          component: (
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? (
                <>
                  <ServicePoliciesSection
                    deposit={15}
                    policies={res.data.policies}
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Working hours",
          component: (
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? (
                <>
                  <ServiceWorkingHoursSection
                    workingDays={res.data.workingDays}
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Rooms",
          component: (
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? (
                <>
                  <HotelServiceRoomsSection rooms={res.data.rooms} />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Localization",
          component: (
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? (
                <>
                  <ServiceOnMapLocalizationSection
                    location={res.data.location}
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Customer reviews",
          component: (
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? (
                <>
                  <Reviews id={res?.data.id || ""} reviews={reviews} />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
      ],
      [res]
    );

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <ServicePresentationCarosuel
        data={res ? res.data.presintations || [] : []}
      />
      <StaticSideBarWrapper sidebar={ServiceReservastion}>
        <Tabs>
          <TabsHeader />
          <TabList />
          {ServicesProviderTabs.map((tab, i) => (
            <>
              <TabTitle TabKey={i}>
                {({ currentActive }) => (
                  <p
                    className={`${
                      currentActive ? "text-primary" : "text-lightBlack"
                    } font-bold text-sm`}
                  >
                    {t(tab.name)}
                  </p>
                )}
              </TabTitle>
            </>
          ))}
        </Tabs>
        {ServicesProviderTabs[0].component}
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
    slug: "rooms",
    name: "Rooms",
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
