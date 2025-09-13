"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { useResponsive } from "@UI/../hooks";

import {
  Button,
  Drawer,
  FilterIcon,
  HStack,
  Input,
  ModalContent,
  Pagination,
  Select,
  SelectOption,
} from "@partials";
import {
  DateFormInput,
  ServiceSearchFilter,
  SpinnerFallback,
  usePaginationControls,
  useSocialControls,
} from "@blocks";
import {
  HealthCenterDoctorAvailablityStatus,
  PresentationType,
  ServiceFilterSelectionType,
  ServicePresentationType,
  ServiceType,
} from "@features/API";
import { getRandomName, mapArray, randomNum, useForm } from "@UI/../utils/src";


import {
  ServicePaymentMethod,
  ServiceStatus,
} from "@features/API/gql/generated";
import { MarketBeautyCenterSearchCardAlt, MarketHealthCenterServiceCardAlt, MarketHolidayRentalsServiceSearchCardAlt, MarketHotelServiceSearchCardAlt, MarketRestaurantServiceSearchCardAlt, MarketVehicleServiceSearchCardAlt } from "@features/Services/MarketSections/MarketSearviceSearchItems";
import { DisplayFoundServices, HealthCenterFindTableSteper, HealthCenterServiceSearchResultsList, HotelDetailedSearchCard, RecommendedBeautyCenterSearchList, ResturantFindTableFilterStepper, ResturantSearchList, SearchServiceQuery, ServicesSearchGrid, ServicesSearchResultsFiltersSidebar, VehicleSearchCard } from "@features/Services";
import { ServicePaymentMethods } from "api";

import { useGetFilteredServicesQuery, useGetServiceCategoryFiltersQuery } from "@features/Services/Services/queries"
import { getRandomServiceImage, SectionHeader } from "@UI";
import HotelCard from "@features/Services/components/Hotel/HotelCard";
import RestaurantCard from "@features/Services/components/Restaurant/RestaurantCard";
import VehicleServiceCard from "@features/Services/components/Vehicle/VehicleServiceCard";
import BeautityCenterCard from "@features/Services/components/BeautyCenter/beautyCenterCard";

export const MarketDeatilsView: React.FC<{

  searchQuery: string;
  serviceType: ServiceType;
}> = ({ searchQuery, serviceType }) => {





  const { t } = useTranslation();
  const { isTablet, isMobile } = useResponsive();
  const { showServiceSearchResultsFilter } = useSocialControls();
  const { controls, pagination } = usePaginationControls();
  const { form, handleChange } = useForm<
    Parameters<typeof useGetFilteredServicesQuery>[0]
  >({
    serviceType,
    pagination,
    filters: [],
  });


  const {
    data: services,
    isLoading,
    isError,
  } = useGetFilteredServicesQuery(form);
  console.log(services, "serrrr");

  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  return isMobile ? (
    <div className="flex flex-col gap-4">
      <SectionHeader
        sectionTitle={t(`${services?.total} ${t("results found")}`)}
      >
        <button onClick={() => showServiceSearchResultsFilter(serviceType)}>
          <FilterIcon />
        </button>
      </SectionHeader>

      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <MobileServicesCardsSwitcherView
          services={services}
          serviceType={serviceType}
        />
      </SpinnerFallback>

      <MarketServiceSearchResultsFiltersModal
        onApply={(filters) => {
          handleChange("filters", filters);
        }}
      />
    </div>
  ) : (
    <div
      className={`relative flex py-4 ${isTablet ? "flex-col gap-4" : "flex-row gap-12"
        } ]`} // ✅ full viewport height minus header/footer
    >
      {/* Filters */}
      <div className="flex-1 max-w-sm ">
        <ServicesSearchResultsFiltersSidebar onShowOnMap={() => { }}>
          {showOn([ServiceType.Hotel, ServiceType.HolidayRentals]) ? (
            <div className="p-4 w-full bg-primary-200 text-black flex flex-col gap-2">
              <Input
                label={t("Destination") + "/" + t("property name") + ":"}
                name="search_query"
              />
              <DateFormInput
                className={"bg-white h-12"}
                menuProps={{
                  menuListProps: {
                    className: "translate-x-full origin-top-left",
                  },
                }}
                placeholder={t("Check-in") + " " + t("date")}
                label={t("Check-in") + " " + t("date") + ":"}
              />
              <DateFormInput
                menuProps={{
                  menuListProps: {
                    className: "translate-x-full origin-top-left",
                  },
                }}
                placeholder={t("Check-out") + " " + t("date")}
                className={"bg-white h-12 "}
                label={t("Check-out") + " " + t("date") + ":"}
              />
              <Select>
                <SelectOption value={"1"}>test</SelectOption>
              </Select>
              <Button>{t("Search")}</Button>
            </div>
          ) : null}

          {showOn([ServiceType.Restaurant, ServiceType.BeautyCenter]) ? (
            <ResturantFindTableFilterStepper />
          ) : null}

          {showOn([ServiceType.HealthCenter]) ? (
            <HealthCenterFindTableSteper />
          ) : null}

          <ServiceSearchFilter serviceType={serviceType} onChange={{}} />
        </ServicesSearchResultsFiltersSidebar>
      </div>

      {/* Results */}
      <div className="flex-[3] bg-white rounded-lg shadow-sm overflow-y-auto p-4">
        <ServicesCardsSwitcherView
          serviceType={serviceType}
          services={services}
          showOn={showOn}
          searchQuery={searchQuery}
        />
      </div>
    </div>

  );
};

const MarketServiceSearchResultsFiltersModal: React.FC<{
  onApply: (
    filters: {
      id: string;
      value: string[];
    }[],
  ) => void;
}> = ({ onApply }) => {
  const { hideServiceSearchResultsFilter, value: serviceType } =
    useSocialControls("marketServiceSearchResultsFilters");
  const { t } = useTranslation();
  const isOpen = Object.values(ServiceType).includes(
    serviceType as ServiceType,
  );

  const { data: filters } = useGetServiceCategoryFiltersQuery(
    { serviceType: serviceType! },
    { enabled: isOpen },
  );

  const [selectedValues, setSelectedValues] = React.useState<
    {
      id: string;
      value: string[];
    }[]
  >([]);

  const isSelected = (id: string, value: string): boolean => {
    const values = selectedValues.find((v) => v.id === id)?.value;

    if (values) {
      return values.includes(value);
    } else {
      return false;
    }
  };

  const toggleSelect = (id: string, value: string, multiple?: boolean) => {
    const values = selectedValues.find((v) => v.id === id)?.value;

    if (values) {
      if (values.includes(value)) {
        setSelectedValues((old) => [
          ...old.filter((v) => v.id !== id),
          { id, value: values.filter((v) => v !== value) },
        ]);
      } else {
        setSelectedValues((old) => [
          ...old.filter((v) => v.id !== id),
          { id, value: [...values, value] },
        ]);
      }
    } else {
      setSelectedValues((old) => [...old, { id, value: [value] }]);
    }
  };

  return (
    <Drawer
      full
      position="bottom"
      isLazy
      onClose={hideServiceSearchResultsFilter}
      isOpen={isOpen}
    >
      <ModalContent>
        <SectionHeader
          onBack={hideServiceSearchResultsFilter}
          sectionTitle={`${t("Filter")}`}
        >
          <button>{t("Clear all")}</button>
        </SectionHeader>

        <div className="flex flex-col gap-6">
          {mapArray(filters, (filter) => (
            <div className="flex flex-col gap-4">
              <p>{filter.filterGroupName}</p>
              {filter.selectionType ===
                ServiceFilterSelectionType.MultiSelect ? (
                <HStack className="w-full overflow-x-scroll">
                  {mapArray(filter.filterValues, (value, i) => (
                    <Button
                      onClick={() =>
                        toggleSelect(filter.id, value.filteringValue, true)
                      }
                      outline={!isSelected(filter.id, value.filteringValue)}
                      key={value.filteringValue + i}
                    >
                      {value.name}
                    </Button>
                  ))}
                </HStack>
              ) : filter.selectionType ===
                ServiceFilterSelectionType.SingleSelect ? (
                <HStack className="w-full overflow-x-scroll">
                  {mapArray(filter.filterValues, (value, i) => (
                    <Button
                      onClick={() =>
                        toggleSelect(filter.id, value.filteringValue, false)
                      }
                      outline={!isSelected(filter.id, value.filteringValue)}
                      key={value.filteringValue + i}
                    >
                      {value.name}
                    </Button>
                  ))}
                </HStack>
              ) : (
                // TODO: add range input
                (<></>)
              )}
            </div>
          ))}
          <Button
            onClick={() => onApply && onApply(selectedValues)}
            outline
            colorScheme="darkbrown"
          >
            {t("Apply Filters")}
          </Button>
        </div>
      </ModalContent>
    </Drawer>
  );
};

interface MobileServicesCardsSwitcherViewProps {
  services: any;
  serviceType: ServiceType;
}

const MobileServicesCardsSwitcherView: React.FC<
  MobileServicesCardsSwitcherViewProps
> = ({ services, serviceType }) => {
  const placeholderData = Array.from({ length: 4 }).map((_, idx) => ({
    id: `placeholder-${idx}`,
    name: "Service Name Placeholder",
    price: 0,
    rating: 0,
    shop: {
      location: { city: "City Placeholder", country: "Country Placeholder" },
      sellerProfile: {
        username: "Seller Placeholder",
        photo: "/shop.jpeg",
        verified: false,
      },
    },
    thumbnail: "/shop.jpeg",
    description: "Description Placeholder",
    reviews: 0,
    speciality: "Speciality Placeholder",
    availableAppointments: [],
    healthCenterBookedAppointments: [],
    airCondition: false,
    gpsAvailable: false,
    lugaggeCapacity: 0,
    seats: 0,
    windows: 0,
    treatmentCategory: "Category Placeholder",
    saved: false,
  }));

  const dataToRender = services?.data?.length ? services.data : placeholderData;
  return (
    <div className="grid grid-cols-2 gap-2">
      {mapArray(
        dataToRender?.data,
        (service: {
          title?: string;
          name: string;
          price: number;
          rating: number;
          shop: {
            location: { city: string; country: string };
            sellerProfile: { username: string; photo: string; verified: boolean };
          };
          thumbnail: string;
          description: string;
          reviews: number;
          speciality?: string;
          availableAppointments?: any[];
          healthCenterBookedAppointments?: any[];
          airCondition?: boolean;
          gpsAvailable?: boolean;
          lugaggeCapacity?: number;
          seats?: number;
          windows?: number;
          id: string;
          treatmentCategory?: string;
          saved?: boolean;
        }) => {
          const {
            title,
            name,
            price,
            rating,
            shop,
            thumbnail,
            description,
            reviews,
            speciality,
            availableAppointments,
            healthCenterBookedAppointments,
            airCondition,
            gpsAvailable,
            lugaggeCapacity,
            seats,
            windows,
            id,
            treatmentCategory,
            saved,
          } = service;
          switch (serviceType) {
            case ServiceType.Hotel:
              return (
                <MarketHotelServiceSearchCardAlt
                  description={description}
                  location={`${shop?.location?.city}, ${shop?.location?.country}`}
                  name={name}
                  price={price}
                  rating={rating}
                  thumbnail={thumbnail}
                />
              );

            case ServiceType.Restaurant:
              return (
                <MarketRestaurantServiceSearchCardAlt
                  id={id}
                  reviews={reviews}
                  location={{
                    ...shop.location,
                    address: "Unknown Address",
                    lat: 0,
                    long: 0,
                    state: "Unknown State",
                  }}
                  name={name}
                  price={price}
                  rating={rating}
                  images={[thumbnail]}
                />
              );
            case ServiceType.HealthCenter:
              return (
                <MarketHealthCenterServiceCardAlt
                  id={id}
                  bookedAppointments={healthCenterBookedAppointments}
                  title={name}
                  location={`${shop?.location?.city}, ${shop?.location?.country}`}
                  thumbnail={thumbnail}
                  speciality={speciality || ""}
                  appointments={availableAppointments || []}
                />
              );
            case ServiceType.Vehicle:
              return (
                <MarketVehicleServiceSearchCardAlt
                  id={id}
                  title={name}
                  airCondition={!!airCondition}
                  gps={!!gpsAvailable}
                  thumbnail={thumbnail}
                  luggage={lugaggeCapacity || 0}
                  pricePerDay={price}
                  windows={windows || 0}
                  passengers={seats || 0}
                />
              );

            case ServiceType.BeautyCenter:
              return (
                <MarketBeautyCenterSearchCardAlt
                  title={title}
                  thumbnail={thumbnail}
                  id={id}
                  rate={rating}
                  reviews={reviews}
                  category={treatmentCategory!}
                  name={name}
                />
              );
            case ServiceType.HolidayRentals:
              return (
                <MarketHolidayRentalsServiceSearchCardAlt
                  id={id}
                  title={name}
                  thumbnail={thumbnail}
                  description={description}
                  location={`${shop?.location?.city}, ${shop?.location?.country}`}
                  monthlyPrice={price}
                  seller={{
                    name: shop.sellerProfile.username,
                    thumbnail: shop.sellerProfile.photo,
                    verified: shop.sellerProfile.verified,
                  }}
                  rating={rating}
                  saved={saved}
                  date={{ from: "Jul 30", to: "Jul 30" }}
                />
              );

            default:
              return null;
          }
        },
      )}
    </div>
  );
};

interface ServicesCardsSwitcherViewProps {
  services: SearchServiceQuery["searchServices"];
  serviceType: ServiceType;
  showOn: (serviceTypes: ServiceType[]) => boolean;
  searchQuery: string;
}

const ServicesCardsSwitcherView: React.FC<
  ServicesCardsSwitcherViewProps
> = ({ services, serviceType, showOn, searchQuery }) => {
  const { isTablet, isMobile } = useResponsive();


  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full gap-4 ">
      {serviceType === ServiceType.Hotel ? (
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col gap-4 justify-center">
            <DisplayFoundServices location={searchQuery} servicesNum={30} />
            {(services?.data?.length || 0) < 1 ? (
              <div className="w-fit h-48 flex justify-center items-center text-2xl">
                <span>{t("no services found")}</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 overflow-y-auto p-2">
                {mapArray(services?.data, (service, i) => (
                  <HotelCard
                    key={service.id || i}
                    id={service.id || "unknown-id"}
                    image={service.thumbnail || "/shop.jpeg"}
                    name={service.name || "Fake Name"}
                    location={`${service.shop?.location?.address || ""}, ${service.shop?.location?.city || ""}`}
                    price={service.price || "0"}
                    rating={service.rating || 0}
                    reviews={service.reviews || 0}
                    dateRange="Available Now"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}


      {serviceType === ServiceType.Restaurant ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 overflow-y-auto p-2">
          {mapArray(services?.data, (service, i) => (
            <RestaurantCard
              key={service.id || i}
              id={service.id || "unknown-id"}
              image={service.thumbnail || "/shop.jpeg"}
              name={service.name || "Fake Name"}
              address={`${service.shop?.location?.address || ""}, ${service.shop?.location?.city || ""}`}
              priceRange={service.price || "0"}
              rating={service.rating || 0}
              reviews={service.reviews || 0}
              cuisine={service.name}
            />
          ))}
        </div>

      ) : null}

      {showOn([ServiceType.HealthCenter]) ? (
        <div className="flex flex-col">
          <DisplayFoundServices
            location={searchQuery || ""}
            servicesNum={randomNum(500)}
          />
          <HealthCenterServiceSearchResultsList
            doctors={[...Array(15)].map(() => ({
              id: "doctor123",
              rating: 3,
              healthCenterId: "33",
              healthCenter: {
                __typename: "HealthCenter",
                owner: null,
                contact: {
                  __typename: "ServiceContact",
                  address: "123 Main St",
                  country: "Country",
                  state: "State",
                  city: "City",
                  email: "contact@example.com",
                  phone: "+1234567890",
                },
                id: "healthcenter123",
                ownerId: "owner456",
                vat: 10.0,
                rating: 4.5,
                totalReviews: 100,
                location: {
                  __typename: "ServiceLocation",
                  address: "456 Elm St",
                  country: "Country",
                  state: "State",
                  city: "City",
                  lat: 40.7128,
                  lon: -74.006,
                  postalCode: 10001,
                },
                status: ServiceStatus.Active,
                presentations: [
                  {
                    __typename: "ServicePresentation",
                    type: ServicePresentationType.Img,
                    src: "/shop.jpeg",
                  },
                ],
                policies: [
                  {
                    __typename: "ServicePolicy",
                    policyTitle: "Cancellation Policy",
                    terms: ["Term 1", "Term 2"],
                  },
                ],
                serviceMetaInfo: {
                  __typename: "ServiceMetaInfo",
                  title: "Health Center Title",
                  description: "Description of the health center",
                  metaTagDescription: "Meta description",
                  metaTagKeywords: ["keyword1", "keyword2"],
                  hashtags: ["health", "center", "medical"],
                },
                payment_methods: [
                  ServicePaymentMethods.Cash,
                  ServicePaymentMethods.CreditCard,
                ],
                cancelationPolicies: [
                  {
                    __typename: "ServiceCancelationPolicy",
                    id: "policy-1",
                    duration: 24,
                    cost: 10,
                  },
                ],
                doctors: [], // Placeholder array, add mock doctors as needed
                workingHours: {
                  __typename: "WorkingSchedule",
                  id: "schedule789",

                  weekdays: {
                    __typename: "WeekdaysWorkingHours",
                    mo: {
                      __typename: "ServiceDayWorkingHours",
                      periods: ["09:00-10:00", "11:00-12:00", "13:00-14:00"],
                    },
                    tu: {
                      __typename: "ServiceDayWorkingHours",
                      periods: ["09:00-10:00"],
                    },
                    we: {
                      __typename: "ServiceDayWorkingHours",
                      periods: ["09:00-10:00"],
                    },
                    th: {
                      __typename: "ServiceDayWorkingHours",
                      periods: ["09:00-10:00"],
                    },
                    fr: {
                      __typename: "ServiceDayWorkingHours",
                      periods: ["09:00-10:00"],
                    },
                  },
                },
              },
              specialityId: "speciality123",
              name: "Dr. John Doe",
              thumbnail: "/assets/ladies-doc.png",
              price: 100,
              description:
                "Experienced doctor specializing in internal medicine.",
              availablityStatus: HealthCenterDoctorAvailablityStatus.Available,
            }))}
          />
        </div>
      ) : null}

      {showOn([ServiceType.BeautyCenter]) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 overflow-y-auto p-2">
          {mapArray(services?.data, (service, i) => (
            <BeautityCenterCard
              key={service.id || i}
              id={service.id || "unknown-id"}
              role="Facial"
              address={`${service.shop?.location?.address || ""}, ${service.shop?.location?.city || ""}`}
              price={service.price || "0"}
              rating={4}

              image={getRandomServiceImage(ServiceType.BeautyCenter)}
              name={service.name}
              duration="10"
              reviews={service.reviews}
            />

          ))}
        </div>

      ) : null}

      {showOn([ServiceType.Vehicle]) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 overflow-y-auto p-2">
          {mapArray(services?.data, (service, i) => (
            <VehicleServiceCard
              key={service.id || i}
              id={service.id || "unknown-id"}
              image={service.thumbnail || "/shop.jpeg"}
              provider={service.description}
              name={service.name || "Fake Name"}
              address={`${service.shop?.location?.address || ""}, ${service.shop?.location?.city || ""}`}
              price={service.price || "0"}
              priceType="Day"
              rating={service.rating || 0}
              reviews={service.reviews || 0}

            />
          ))}
        </div>


      ) : null}

      <Pagination />
    </div>
  );
};
