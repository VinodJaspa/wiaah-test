import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "@UI/../routing";
import { useResponsive } from "@UI/../hooks";
import { useGetSearchServicesQuery } from "../Services";
import {
  DisplayFoundServices,
  ServicesSearchGrid,
  ServicesSearchResultsFiltersSidebar,
} from "../components";
import { Button, Input, Pagination, Select, SelectOption } from "@partials";
import { DateFormInput, ServiceSearchFilter, SpinnerFallback } from "@blocks";
import {
  HealthCenterDoctorAvailablityStatus,
  PresentationType,
  ServiceType,
  Vehicle,
} from "@features/API";
import { getRandomName, mapArray, randomNum, useForm } from "@UI/../utils/src";
import { HotelDetailedSearchCard } from "../hotels";
import {
  ResturantFindTableFilterStepper,
  ResturantSearchList,
} from "../resturant";
import { HealthCenterServiceSearchResultsList } from "../HealthCenter";
import {
  RecommendedBeautyCenterSearchList,
  useGetFilteredBeautyCenterTreatmentsQuery,
} from "../beautyCenter";
import { getRandomServiceImage } from "@UI/placeholder";
import {
  VehicleSearchCard,
  VehicleSearchCardProps,
  VehicleSearchList,
} from "../Vehicle";
import { VehicleSearchData } from "@UI/../api";

export const MarketServiceSearchResaultsView: React.FC<{
  searchQuery: string;
  serviceType: ServiceType;
}> = ({ searchQuery, serviceType }) => {
  const { t } = useTranslation();
  const { isTablet } = useResponsive();
  const { form } = useForm<Parameters<typeof useGetSearchServicesQuery>[0]>({
    q: "",
  });
  const {
    data: services,
    isLoading,
    isError,
  } = useGetSearchServicesQuery(form);

  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  return (
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
            <div className="w-full justify-start ">
              <div className="flex items-end justify-between w-full">
                <div className="flex gap-4">
                  <Input name="title" label={t("Title")} />
                  <Input name="rate" type={"number"} label={t("Rating")} />
                  <Input name="price" type="number" label={t("Price")} />
                  <Input name="seller" label={t("Seller")} />
                </div>
                <Button>{t("Search")}</Button>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 justify-center">
              <DisplayFoundServices
                location={searchQuery}
                servicesNum={services?.length || 0}
              />
              {/* {services?.length || 0 < 1 ? (
                <div className="w-fit h-48 flex just-center items-center text-2xl">
                <span>{t("no services found")}</span>
                </div>
            ) : ( */}
              {mapArray(services, (service, i) => (
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
              {/* )} */}
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
                availablityStatus:
                  HealthCenterDoctorAvailablityStatus.Available,
                description: "",
                healthCenter: {
                  location: {
                    address: "address",
                    city: "city",
                    country: "country",
                    lat: 0,
                    lon: 0,
                    postalCode: "1324",
                    state: "state",
                  },
                  workingHours: {
                    id: "",
                    weekdays: {
                      fr: { periods: [new Date(), new Date()] },
                      mo: { periods: [new Date(), new Date()] },
                      sa: { periods: [new Date(), new Date()] },
                      su: { periods: [new Date(), new Date()] },
                      th: { periods: [new Date(), new Date()] },
                      tu: { periods: [new Date(), new Date()] },
                      we: { periods: [new Date(), new Date()] },
                    },
                  },
                },
                healthCenterId: "",
                id: "",
                name: `Dr.${getRandomName().firstName} ${
                  getRandomName().lastName
                }`,
                price: randomNum(150),
                rating: 4,
                specialityId: "",
                thumbnail:
                  "https://img.freepik.com/premium-photo/covid-19-coronavirus-outbreak-healthcare-workers-pandemic-concept_1258-19738.jpg?w=2000",
                speciality: {
                  description: "",
                  id: "",
                  name: "Dentist",
                },
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
            data={
              [...Array(24)].map(() => ({
                id: "",
                title: "Vehicle Name",
                brand: "",
                model: "",
                price: randomNum(150),
                cancelationPolicies: [],
                presentations: [
                  {
                    src: getRandomServiceImage(ServiceType.Vehicle),
                    type: PresentationType.Image,
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
              })) as Vehicle[]
            }
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
