import React from "react";
import {
  Tabs,
  TabList,
  TabTitle,
  TabsHeader,
  useGetServicesProviderQuery,
  useSearchFilters,
  ServiceReachOutSection,
  ServiceOnMapLocalizationSection,
  ServicePoliciesSection,
  HotelServiceRoomsSection,
  PopularAmenitiesSection,
  ServicesProviderDescriptionSection,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  ServiceReservastion,
  SpinnerFallback,
  ServiceDetailsReviewsSection,
  SellerServiceWorkingHoursSection,
  ServicesProviderHeader,
  Image,
  Button,
  Divider,
  LocationIcon,
  LocationOnPointFillIcon,
  LocationAddressDisplay,
} from "ui";
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

  const ServicesProviderTabs: { name: string; component: React.ReactNode }[] =
    React.useMemo(
      () => [
        {
          name: "Description",
          component: (
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? (
                <div className="flex flex-col gap-8">
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
                    title={"Check-in Checkout Terms"}
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
                  <SellerServiceWorkingHoursSection
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
                  <ServiceDetailsReviewsSection
                    overAllRating={5}
                    ratingLevels={[
                      {
                        rate: 4.9,
                        name: "Amenities",
                      },
                      {
                        name: "Communication",
                        rate: 5,
                      },
                      {
                        name: "Value for Money",
                        rate: 5,
                      },
                      {
                        name: "Hygiene",
                        rate: 5,
                      },
                      {
                        name: "Location of Property",
                        rate: 5,
                      },
                    ]}
                    reviews={[...Array(6)].map((_, i) => ({
                      name: "John Doberman",
                      content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      thumbnail: `/profile (${i + 1}).jfif`,
                      date: new Date().toString(),
                    }))}
                  />
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
      <div className="flex w-full items-center justify-between shadow p-4">
        <div className="flex gap-4">
          <Image
            className="w-28 h-20 rounded-xl object-cover"
            src={res ? res.data.thumbnail : ""}
          />
          <div className="flex flex-col">
            <p className=" font-bold text-xl">{res ? res.data.name : null}</p>
            <div className="flex text-black gap-1 items-center">
              <LocationOnPointFillIcon />
              {res ? (
                <p>
                  {res.data.location.city}, {res.data.location.country}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button>{t("Follow")}</Button>
          <Button outline>{t("Contact")}</Button>
        </div>
      </div>
      <Divider />
      <ServicePresentationCarosuel
        data={res ? res.data.presintations || [] : []}
      />
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? <ServicesProviderHeader {...res.data} /> : null}
      </SpinnerFallback>
      <StaticSideBarWrapper sidebar={ServiceReservastion}>
        <Tabs>
          {({ currentTabIdx }) => {
            return (
              <>
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
                {ServicesProviderTabs.at(currentTabIdx).component}
              </>
            );
          }}
        </Tabs>
      </StaticSideBarWrapper>
    </div>
  );
};
