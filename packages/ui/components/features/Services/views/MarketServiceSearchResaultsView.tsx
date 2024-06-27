import React from "react";
import { useTranslation } from "react-i18next";
import { useResponsive } from "@UI/../hooks";
import {
  ServicePaymentMethods,
  useGetFilteredServicesQuery,
} from "../Services";
import {
  DisplayFoundServices,
  ServicesSearchGrid,
  ServicesSearchResultsFiltersSidebar,
} from "../components";
import {
  Button,
  Drawer,
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
import { HotelDetailedSearchCard } from "../hotels";
import {
  ResturantFindTableFilterStepper,
  ResturantSearchList,
} from "../resturant";
import { HealthCenterServiceSearchResultsList } from "../HealthCenter";
import { RecommendedBeautyCenterSearchList } from "../beautyCenter";
import { getRandomServiceImage } from "@UI/placeholder";
import { VehicleSearchCard } from "../Vehicle";
import { SectionHeader } from "@sections/ShoppingManagement";
import { FilterIcon } from "@UI/components/partials/icons/FilterIcon";
import {
  MarketBeautyCenterSearchCardAlt,
  MarketHealthCenterServiceCardAlt,
  MarketHolidayRentalsServiceSearchCardAlt,
  MarketHotelServiceSearchCardAlt,
  MarketRestaurantServiceSearchCardAlt,
  MarketVehicleServiceSearchCardAlt,
} from "./MarketServiceSearchView";
import { useGetServiceCategoryFiltersQuery } from "../Services/queries/getServiceCategoryFilters.fetcher";
import {
  ServicePaymentMethod,
  ServiceStatus,
} from "@features/API/gql/generated";

export const MarketServiceSearchResaultsView: React.FC<{
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
    pagination,
    filters: [],
  });
  const {
    data: services,
    isLoading,
    isError,
  } = useGetFilteredServicesQuery(form);

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
        <div className="grid grid-cols-2 gap-2">
          {mapArray(
            services?.data,
            ({
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
            }) => {
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
                      reviews={reviews}
                      location={`${shop?.location?.city}, ${shop?.location?.country}`}
                      name={name}
                      price={price}
                      rating={rating}
                      thumbnail={thumbnail}
                    />
                  );
                case ServiceType.HealthCenter:
                  return (
                    <MarketHealthCenterServiceCardAlt
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
                      title={name}
                      thumbnail={thumbnail}
                      id={id}
                      rate={rating}
                      reviews={reviews}
                      category={treatmentCategory!}
                    />
                  );
                case ServiceType.HolidayRentals:
                  return (
                    <MarketHolidayRentalsServiceSearchCardAlt
                      title={name}
                      thumbnail={thumbnail}
                      reviews={reviews}
                      description={description}
                      location={`${shop?.location?.city}, ${shop?.location?.country}`}
                      monthlyPrice={price}
                      rating={rating}
                      saved={saved}
                      sellerName={shop.sellerProfile.username}
                      sellerThumbnail={shop.sellerProfile.photo}
                      sellerVerified={shop.sellerProfile.verified}
                    />
                  );

                default:
                  break;
              }
            },
          )}
        </div>
      </SpinnerFallback>

      <MarketServiceSearchResultsFiltersModal
        onApply={(filters) => {
          handleChange("filters", filters);
        }}
      />
    </div>
  ) : (
    <div
      className={`${
        isTablet ? "flex-col gap-4" : "flex-row gap-12"
      } relative flex  py-4`}
    >
      <ServicesSearchResultsFiltersSidebar onShowOnMap={() => {}}>
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

        {showOn([
          ServiceType.Restaurant,
          ServiceType.HealthCenter,
          ServiceType.BeautyCenter,
        ]) ? (
          <ResturantFindTableFilterStepper />
        ) : null}

        <ServiceSearchFilter serviceType={serviceType} onChange={{}} />
      </ServicesSearchResultsFiltersSidebar>

      <div className="flex flex-col w-full gap-4">
        {serviceType === ServiceType.Hotel ? (
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-col gap-4 justify-center">
              <DisplayFoundServices
                location={searchQuery}
                servicesNum={services?.data.length || 0}
              />
              {(services?.data?.length || 0) < 1 ? (
                <div className="w-fit h-48 flex just-center items-center text-2xl">
                  <span>{t("no services found")}</span>
                </div>
              ) : (
                <>
                  {mapArray(services?.data, (service, i) => (
                    <HotelDetailedSearchCard
                      name={service.name}
                      price={service.price}
                      rate={service.rating}
                      reviews={service.reviews}
                      sellerName={service?.shop?.sellerProfile?.username}
                      description={service.description}
                      id={service.id}
                      location={{
                        ...service.shop.location,
                        cords: {
                          lat: service.shop.location.lat,
                          lng: service.shop.location.long,
                        },
                      }}
                      taxesAndFeesIncluded
                      thumbnail={service.thumbnail}
                      vertical={isTablet}
                      key={i}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        ) : null}

        {serviceType === ServiceType.Restaurant ? (
          <ResturantSearchList
            restaurants={[...Array(20)].map(() => ({
              hashtags: [],
              location: {
                address: "address",
                city: "city",
                country: "country",
              },
              price: randomNum(150),
              rating: randomNum(5),
              reviews: randomNum(200),
              thumbnail:
                "https://media-cdn.tripadvisor.com/media/photo-s/1a/8e/55/e6/variety-of-choices.jpg",
              title: "Dish name",
            }))}
          />
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
                      src: "https://example.com/presentation.jpg",
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
                        periods: ["09:00 AM - 05:00 PM"],
                      },
                      tu: {
                        __typename: "ServiceDayWorkingHours",
                        periods: ["09:00 AM - 05:00 PM"],
                      },
                      we: {
                        __typename: "ServiceDayWorkingHours",
                        periods: ["09:00 AM - 05:00 PM"],
                      },
                      th: {
                        __typename: "ServiceDayWorkingHours",
                        periods: ["09:00 AM - 05:00 PM"],
                      },
                      fr: {
                        __typename: "ServiceDayWorkingHours",
                        periods: ["09:00 AM - 05:00 PM"],
                      },

                      sa: {
                        __typename: "ServiceDayWorkingHours",
                        periods: ["09:00 AM - 05:00 PM"],
                      },

                      su: {
                        __typename: "ServiceDayWorkingHours",
                        periods: ["09:00 AM - 05:00 PM"],
                      },
                    },
                  },
                },
                specialityId: "speciality123",
                name: "Dr. John Doe",
                thumbnail: "https://example.com/thumbnail.jpg",
                price: 100,
                description:
                  "Experienced doctor specializing in internal medicine.",
                availablityStatus:
                  HealthCenterDoctorAvailablityStatus.Available,
              }))}
            />
          </div>
        ) : null}

        {showOn([ServiceType.BeautyCenter]) ? (
          <RecommendedBeautyCenterSearchList
            treatments={[...Array(24)].map(() => ({
              id: "",
              category: "Facial",
              duration: 40,
              price: randomNum(150),
              rate: 4,
              reviews: randomNum(1500),
              thumbnail: getRandomServiceImage(ServiceType.BeautyCenter),
              title: "Treatment name",
            }))}
          />
        ) : null}

        {showOn([ServiceType.Vehicle]) ? (
          <ServicesSearchGrid
            data={[...Array(24)].map(() => ({
              id: "",
              title: "Vehicle Name",
              brand: "",
              model: "",
              price: randomNum(150),
              cancelationPolicies: [],
              presentations: [
                {
                  src: getRandomServiceImage(ServiceType.Vehicle),
                  type: ServicePresentationType.Img,
                },
              ],
              thumbnail:
                "https://d.newsweek.com/en/full/2203419/2023-ford-expedition.jpg?w=1600&h=1600&q=88&f=1f6dd5c5cc318e1239e31777f34a50d2",
              properties: {
                airCondition: true,
                gpsAvailable: true,
                lugaggeCapacity: 4,
                maxSpeedInKm: 150,
                seats: 4,
                windows: 4,
              },
            }))}
            component={VehicleSearchCard}
            handlePassData={(props) => ({
              ...props,
              showTotal: false,
              presentations: [
                { src: props.thumbnail, type: PresentationType.Image },
              ],
            })}
          />
        ) : null}

        <Pagination />
      </div>
    </div>
  );
};

export const MarketServiceSearchResultsFiltersModal: React.FC<{
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
                <></>
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
