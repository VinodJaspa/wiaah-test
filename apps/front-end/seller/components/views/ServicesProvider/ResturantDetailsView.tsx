import React from "react";
import {
  SpinnerFallback,
  ServiceOnMapLocalizationSection,
  ServiceReachOutSection,
  ServicePoliciesSection,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  ResturantFindTableFilterStepper,
  ResturantMenuListSection,
  useGetRestaurantServiceDetailsDataQuery,
  Tabs,
  TabsHeader,
  TabList,
  TabTitle,
  ServiceDetailsReviewsSection,
  SellerServiceWorkingHoursSection,
  RestaurantDetailsDescriptionSection,
  ServicesProviderHeader,
  Image,
  LocationOnPointFillIcon,
  Button,
  Divider,
  ServiceReservastionForm,
} from "ui";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

export const RestaurantDetailsView: React.FC = () => {
  const { getParam } = useRouting();
  const id = getParam("id");
  const {
    data: res,
    isError,
    isLoading,
  } = useGetRestaurantServiceDetailsDataQuery(id);
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
                  <RestaurantDetailsDescriptionSection
                    description={res?.serviceMetaInfo?.description}
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
                    email={res?.contact?.email}
                    location={res?.location}
                    telephone={res?.contact?.phone}
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
                    title={"Restaurant Policies and terms"}
                    policies={res?.policies}
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
                    workingDays={Object.values(res?.workingHours || {}) || []}
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Menus",
          component: (
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {res ? (
                <ResturantMenuListSection
                  cancelation={res?.cancelationPolicies || []}
                  menus={res?.menus || []}
                />
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
                  <ServiceOnMapLocalizationSection location={res?.location} />
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
            rating={4.5}
            reviewsCount={15}
            serviceTitle={res.serviceMetaInfo.title}
            travelPeriod={{ arrival: new Date(), departure: new Date() }}
          />
        ) : null}
      </SpinnerFallback>
      <StaticSideBarWrapper
        sidebar={() => {
          return (
            <ServiceReservastionForm
              sellerId={""}
              selectedServicesIds={[]}
              serviceId={""}
            />
          );
        }}
      >
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
