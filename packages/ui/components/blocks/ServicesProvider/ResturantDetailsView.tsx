import { ServicePresentationCarosuel } from "@UI/components/features/Services/ServicesDetails/components/DataDisplay/ServicePresentationCarosuel";
import { ServiceReservastionForm } from "@UI/components/features/Services/ServicesDetails/components/Forms/ServiceReservastion";
import { ServicesProviderHeader } from "@UI/components/features/Services/ServicesDetails/components/Headers/ServicesProviderHeader";
import { ServiceOnMapLocalizationSection } from "@UI/components/features/Services/ServicesDetails/components/Sections/ServiceLocatlizationSection";
import { ServicePoliciesSection } from "@UI/components/features/Services/ServicesDetails/components/Sections/ServicePoliciesSection";
import { ServiceReachOutSection } from "@UI/components/features/Services/ServicesDetails/components/Sections/ServiceReachOutSection";
import { SellerServiceWorkingHoursSection } from "@UI/components/features/Services/components/Sections/SellerServiceWorkingHoursSection";
import { ServiceDetailsReviewsSection } from "@UI/components/features/Services/components/Sections/ServiceDetailsReviewsSection";
import { RestaurantDetailsDescriptionSection } from "@UI/components/features/Services/resturant/components/Sections/RestaurantDetailsDescriptionSection";
import { ResturantMenuListSection } from "@UI/components/features/Services/resturant/components/Sections/ResturantMenuListSection";
import {
  ServicePaymentMethod,
  ServicePresentationType,
  ServiceStatus,
} from "@features/API";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Divider,
  GetRestaurantQuery,
  ServicesProviderDetailsTabs,
  SpinnerFallback,
  StaticSideBarWrapper,
} from "ui";

interface RestaurantDetailsViewProps {
  selectedTab?: number;
}

export const RestaurantDetailsView: React.FC<RestaurantDetailsViewProps> = ({
  selectedTab = 0,
}) => {
  const { getParam } = useRouting();
  const id = getParam("id");
  // const {
  //   data: _res,
  //   isError: _isError,
  //   isLoading: _isLoading,
  // } = useGetRestaurantServiceDetailsDataQuery(id);
  const { t } = useTranslation();

  const res = FAKE_RESTAURANT_DETAILS_DATA;

  const ServicesProviderTabs: { name: string; component: React.ReactNode }[] =
    React.useMemo(
      () => [
        {
          name: "Description",
          component: (
            <SpinnerFallback isLoading={false}>
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
            <SpinnerFallback isLoading={false}>
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
            <SpinnerFallback isLoading={false}>
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
            <SpinnerFallback isLoading={false}>
              {res ? (
                <>
                  <SellerServiceWorkingHoursSection
                    workingDays={res?.workingHours.weekdays}
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Menus",
          component: (
            <SpinnerFallback isLoading={false}>
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
            <SpinnerFallback isLoading={false}>
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
            <SpinnerFallback isLoading={false}>
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
      [res],
    );

  return (
    <div className="flex flex-col gap-8 px-2 py-8 w-11/12">
      {/*<div className="flex w-full items-center justify-between shadow p-4">
        <div className="flex gap-4">
          <Image
            alt="avetar"
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
*/}
      <Divider />
      <ServicePresentationCarosuel data={res ? res.presentations || [] : []} />
      <SpinnerFallback isLoading={false}>
        {res ? (
          <ServicesProviderHeader
            rating={4.5}
            reviewsCount={15}
            serviceTitle={res.serviceMetaInfo.title}
            // travelPeriod={{ arrival: new Date(), departure: new Date() }}
          />
        ) : null}
      </SpinnerFallback>
      <StaticSideBarWrapper
        sidebar={
          <ServiceReservastionForm
            sellerId={""}
            selectedServicesIds={[]}
            // serviceId={""}
          />
        }
      >
        <ServicesProviderDetailsTabs
          tabs={ServicesProviderTabs}
          t={t}
          selectedTab={selectedTab}
        />
      </StaticSideBarWrapper>
    </div>
  );
};

const FAKE_RESTAURANT_DETAILS_DATA: GetRestaurantQuery["getRestaurant"] = {
  cuisinesTypeId: 1,
  establishmentTypeId: 2,
  highest_price: 100.0,
  id: "rest123",
  lowest_price: 20.0,
  michelin_guide_stars: 2,
  ownerId: "owner456",
  payment_methods: [ServicePaymentMethod.Cash],
  setting_and_ambianceId: 3,
  status: ServiceStatus.Active,
  vat: 0.08,
  location: {
    address: "123 Food Street",
    city: "Gourmet City",
    country: "Foodland",
    lat: 40.7128,
    lon: -74.006,
    postalCode: 12345,
    state: "Delicious",
  },
  menus: [
    {
      id: "menu1",
      name: "Lunch Menu",
      dishs: [
        {
          id: "dish1",
          ingredients: ["chicken", "rice", "spices"],
          price: 25.0,
          name: "Chicken Rice",
          thumbnail: getRandomImage(),
        },
        {
          id: "dish2",
          ingredients: ["beef", "noodles", "vegetables"],
          price: 30.0,
          name: "Beef Noodles",
          thumbnail: getRandomImage(),
        },
      ],
    },
    {
      id: "menu2",
      name: "Dinner Menu",
      dishs: [
        {
          id: "dish3",
          ingredients: ["fish", "potatoes", "herbs"],
          price: 35.0,
          name: "Herb Fish",
          thumbnail: getRandomImage(),
        },
        {
          id: "dish4",
          ingredients: ["pasta", "tomato", "cheese"],
          price: 28.0,
          name: "Tomato Pasta",
          thumbnail: getRandomImage(),
        },
      ],
    },
  ],
  policies: [
    {
      policyTitle: "No Smoking",
      terms: ["Smoking is not allowed inside the restaurant."],
    },
    {
      policyTitle: "Pet Friendly",
      terms: ["Pets are allowed in the outdoor seating area."],
    },
  ],
  presentations: [
    {
      src: "https://media.timeout.com/images/105455622/image.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://assets3.thrillist.com/v1/image/2771371/size/tl-horizontal_main/fit/1200x600.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://media.timeout.com/images/105455622/image.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://assets3.thrillist.com/v1/image/2771371/size/tl-horizontal_main/fit/1200x600.jpg",
      type: ServicePresentationType.Img,
    },
  ],
  serviceMetaInfo: {
    description:
      "A fine dining restaurant offering a variety of gourmet dishes.",
    hashtags: ["#gourmet", "#finedining", "#restaurant"],
    metaTagDescription: "Enjoy gourmet dishes at our fine dining restaurant.",
    title: "Gourmet Restaurant",
    metaTagKeywords: ["gourmet", "fine dining", "restaurant"],
  },
  contact: {
    address: "123 Food Street",
    city: "Gourmet City",
    country: "Foodland",
    email: "contact@gourmetrestaurant.com",
    phone: "+1234567890",
    state: "Delicious",
  },
  cancelationPolicies: [
    {
      id: "1",
      cost: 10.0,
      duration: 24,
    },
    {
      id: "2",
      cost: 20.0,
      duration: 24,
    },
  ],
  owner: {
    firstName: "John",
    lastName: "Doe",
    id: "owner456",
    photo: getRandomImage(),
    verified: true,
  },
  workingHours: {
    id: "workingHours123",
    weekdays: {
      fr: {
        periods: ["18:00", "22:00"],
      },
      mo: {
        periods: ["18:00", "22:00"],
      },
      sa: {
        periods: ["18:00", "23:00"],
      },
      su: {
        periods: ["12:00", "15:00"],
      },
      th: {
        periods: ["18:00", "22:00"],
      },
      tu: {
        periods: ["18:00", "22:00"],
      },
      we: {
        periods: ["18:00", "22:00"],
      },
    },
  },
};
