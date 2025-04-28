import { ServicePresentationCarosuel } from "@UI/components/features/Services/ServicesDetails/components/DataDisplay/ServicePresentationCarosuel";
import { ServiceReservastionForm } from "@UI/components/features/Services/ServicesDetails/components/Forms/ServiceReservastion";
import { ServicesProviderHeader } from "@UI/components/features/Services/ServicesDetails/components/Headers/ServicesProviderHeader";
import { ServiceOnMapLocalizationSection } from "@UI/components/features/Services/ServicesDetails/components/Sections/ServiceLocatlizationSection";
import { ServicePoliciesSection } from "@UI/components/features/Services/ServicesDetails/components/Sections/ServicePoliciesSection";
import { ServiceReachOutSection } from "@UI/components/features/Services/ServicesDetails/components/Sections/ServiceReachOutSection";
import { BeautyCenterTreatmentsList } from "@UI/components/features/Services/beautyCenter/components/lists/BeautyCenterTreatmentsList";
import { SellerServiceWorkingHoursSection } from "@UI/components/features/Services/components/Sections/SellerServiceWorkingHoursSection";
import { ServiceDetailsReviewsSection } from "@UI/components/features/Services/components/Sections/ServiceDetailsReviewsSection";
import { RestaurantDetailsDescriptionSection } from "@UI/components/features/Services/resturant/components/Sections/RestaurantDetailsDescriptionSection";
import { SpinnerFallback } from "@blocks/FallbackDisplays";
import { StaticSideBarWrapper } from "@blocks/Wrappers";
import { ServicePresentationType } from "@features/API";
import { Divider } from "@partials";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { ServicesProviderDetailsTabs } from "./ServiceProviderTabs";

interface BeautyCenterServiceDetailsViewProps {
  selectedTab?: number;
}

export const BeautyCenterServiceDetailsView: React.FC<
  BeautyCenterServiceDetailsViewProps
> = ({ selectedTab = 0 }) => {
  const { getParam } = useRouting();
  const id = getParam("id");
  //WARNING: grqphql endpoint query is not ready
  // const {
  //   data: _res,
  //   isError: _isError,
  //   isLoading: _isLoading,
  // } = useGetBeautyCenterDetailsQuery(id);
  const res = FAKE_BEAUTY_CENTER_DATA;
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

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
                    description={res.serviceMetaInfo.description}
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
            <SpinnerFallback isLoading={false}>
              {res ? (
                <>
                  <ServicePoliciesSection
                    title={"Beauty center Policies and terms"}
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
            <SpinnerFallback isLoading={false}>
              {res ? (
                <>
                  <SellerServiceWorkingHoursSection
                    workingDays={res.workingHours.weekdays}
                  />
                </>
              ) : null}
            </SpinnerFallback>
          ),
        },
        {
          name: "Treatments",
          component: (
            <SpinnerFallback isLoading={false}>
              {res ? (
                <BeautyCenterTreatmentsList
                  cancelation={res.cancelationPolicies || []}
                  treatments={res.treatments || []}
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
                  <ServiceOnMapLocalizationSection location={res.location} />
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
                      ratings: 5,
                      bookedService: {
                        id: `service-${i + 1}`,
                        image: `/service-image-${i + 1}.jpg`,
                        name: `Service ${i + 1}`,
                      },
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
      {/* <div className="flex w-full items-center justify-between shadow p-4">
        <div className="flex gap-4">
          <Image
            alt="avatar"
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
      </div> */}
      <Divider />
      <ServicePresentationCarosuel data={res.presentations} />
      <SpinnerFallback isLoading={false}>
        {res ? (
          <ServicesProviderHeader
            rating={res.rating}
            reviewsCount={res.totalReviews}
            serviceTitle={res.serviceMetaInfo.title}
            // travelPeriod={{ arrival: new Date(), departure: new Date() }}
          />
        ) : null}
      </SpinnerFallback>
      <StaticSideBarWrapper
        sidebar={
          <ServiceReservastionForm
            sellerId={"test"}
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

const FAKE_BEAUTY_CENTER_DATA = {
  beauty_center_typeId: "bct1",
  createdAt: "2023-01-01T00:00:00Z",
  id: "bc123",
  ownerId: "owner456",
  payment_methods: ["credit_card", "cash", "paypal"],
  rating: 4.7,
  status: "active",
  title: "Glamour Beauty Center",
  totalReviews: 230,
  type_of_seller: "individual",
  updatedAt: "2023-06-01T00:00:00Z",
  vat: 0.15,
  cancelationPolicies: [
    { id: "1", cost: 20.0, duration: 24 },
    { id: "2", cost: 50.0, duration: 12 },
  ],
  location: {
    address: "123 Beauty St",
    city: "Beautville",
    country: "Beautland",
    lat: 40.7128,
    lon: -74.006,
    postalCode: 12345,
    state: "Beautystate",
  },
  owner: {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    photo: getRandomImage(),
    verified: true,
  },
  policies: [
    {
      policyTitle: "No Pets",
      terms: ["Pets are not allowed inside the beauty center."],
    },
    {
      policyTitle: "Appointment Required",
      terms: ["All visits require a prior appointment."],
    },
  ],
  presentations: [
    {
      src: "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://image-tc.galaxy.tf/wijpeg-5fj3s48cv2nf9rs8mv5amtpab/select-room-one-bedroom-3.jpg?width=1920",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://www.ohotelsindia.com/pune/images/b32d5dc553ee2097368bae13f83e93cf.jpg",
      type: ServicePresentationType.Img,
    },
  ],
  serviceMetaInfo: {
    description:
      "A luxurious beauty center offering a wide range of beauty treatments.",
    hashtags: ["#beauty", "#spa", "#wellness"],
    metaTagDescription:
      "Experience luxury at Glamour Beauty Center with top-notch beauty treatments.",
    metaTagKeywords: ["beauty center", "spa", "wellness", "beauty treatments"],
    title: "Glamour Beauty Center",
  },
  treatments: [
    {
      duration: [60],
      id: "treatment1",
      price: 100.0,
      title: "Relaxing Massage",
      treatmentCategoryId: "cat1",
      beautyCenterServiceId: "bcs1",
      thumbnail: getRandomImage(),
      category: {
        createdAt: "2022-01-01T00:00:00Z",
        createdById: "admin1",
        id: "cat1",
        title: "Massage",
        updatedAt: "2022-12-01T00:00:00Z",
      },
      discount: {
        units: 4,
        value: 10,
      },
    },
    {
      duration: [30],
      id: "treatment2",
      price: 50.0,
      title: "Facial Treatment",
      treatmentCategoryId: "cat2",
      beautyCenterServiceId: "bcs2",
      thumbnail: getRandomImage(),
      category: {
        createdAt: "2022-02-01T00:00:00Z",
        createdById: "admin2",
        id: "cat2",
        title: "Facial",
        updatedAt: "2022-11-01T00:00:00Z",
      },
      discount: {
        units: 4,
        value: 15,
      },
    },
  ],
  contact: {
    address: "123 Beauty St",
    city: "Beautville",
    country: "Beautland",
    email: "contact@beautycenter.com",
    phone: "+1234567890",
    state: "Beautystate",
  },
  workingHours: {
    id: "wh1",
    weekdays: {
      fr: {
        periods: ["09:00", "18:00"],
      },
      sa: {
        periods: ["10:00", "16:00"],
      },
      su: {
        periods: ["10:00", "16:00"],
      },
      mo: {
        periods: ["09:00", "18:00"],
      },
      th: {
        periods: ["09:00", "18:00"],
      },
      tu: {
        periods: [],
      },
      we: {
        periods: ["09:00", "18:00"],
      },
    },
  },
  takenHours: {
    id: "th1",
    weekdays: {
      fr: {
        periods: ["13:00", "14:00"],
      },
      mo: {
        periods: ["13:00", "14:00"],
      },
      sa: {
        periods: ["11:00", "12:00"],
      },
      su: {
        periods: [],
      },
      th: {
        periods: ["13:00", "14:00"],
      },
      tu: {
        periods: ["13:00", "14:00"],
      },
      we: {
        periods: ["13:00", "14:00"],
      },
    },
  },
};
