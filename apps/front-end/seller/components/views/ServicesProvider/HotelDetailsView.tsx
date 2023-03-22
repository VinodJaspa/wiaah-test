import React from "react";
import {
  Tabs,
  TabList,
  TabTitle,
  TabsHeader,
  useGetServicesProviderQuery,
  ServiceReachOutSection,
  ServiceOnMapLocalizationSection,
  ServicePoliciesSection,
  HotelServiceRoomsSection,
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
  LocationOnPointFillIcon,
} from "ui";
import { useTranslation } from "react-i18next";

export const HotelDetailsView: React.FC = () => {
  const { data: res, isError, isLoading } = useGetServicesProviderQuery("");
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
                    description={res.serviceMetaInfo.description}
                    bathrooms={2}
                    bedrooms={3}
                    bikes={3}
                    cars={2}
                    pets={1}
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
                    email={res.contact.email}
                    location={res.location}
                    telephone={res.contact.phone}
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
                    title={"Check-in Checsdkout Terms"}
                    // deposit={15}
                    policies={res.policies}
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
              {res && res.workingHours ? (
                <>
                  <SellerServiceWorkingHoursSection
                    workingDays={Object.values(res.workingHours.weekdays)}
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
                  <HotelServiceRoomsSection rooms={res.rooms} />
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
                  <ServiceOnMapLocalizationSection location={res.location} />
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
      <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-between shadow p-4">
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4">
          <Image
            className="w-40 h-28 sm:h-20 sm:w-28 rounded-xl object-cover"
            src={
              res
                ? "https://www.murhotels.com/cache/40/b3/40b3566310d686be665d9775f59ca9cd.jpg"
                : ""
            }
          />
          <div className="flex flex-col">
            <p className=" font-bold text-xl">
              {res ? res.serviceMetaInfo.title : null}
            </p>
            <div className="flex text-black gap-1 items-center">
              <LocationOnPointFillIcon />
              {res ? (
                <p>
                  {res.location.city}, {res.location.country}
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
      <ServicePresentationCarosuel data={res ? res.presentations || [] : []} />
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {res ? (
          <ServicesProviderHeader
            rating={15}
            reviewsCount={150}
            serviceTitle={"service title"}
            travelPeriod={{ arrival: new Date(), departure: new Date() }}
          />
        ) : null}
      </SpinnerFallback>
      <StaticSideBarWrapper
        sidebar={() =>
          res ? <ServiceReservastion serviceId={res.id} /> : null
        }
      >
        <Tabs>
          {({ currentTabIdx }) => {
            return (
              <>
                <TabsHeader className="flex ">
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
                </TabsHeader>
                <TabList />
                {ServicesProviderTabs.at(currentTabIdx).component}
              </>
            );
          }}
        </Tabs>
      </StaticSideBarWrapper>
    </div>
  );
};
