import React from "react";
import {
  ServiceReachOutSection,
  ServiceOnMapLocalizationSection,
  ServicePoliciesSection,
  HotelServiceRoomsSection,
  ServicesProviderDescriptionSection,
  ServicePresentationCarosuel,
  StaticSideBarWrapper,
  SpinnerFallback,
  ServiceDetailsReviewsSection,
  SellerServiceWorkingHoursSection,
  ServicesProviderHeader,
  Image,
  Button,
  Divider,
  LocationOnPointFillIcon,
  useGetShopDetailsQuery,
  SimpleTabs,
  SimpleTabHead,
  SimpleTabItemList,
  HStack,
  ServiceReservastionForm,
  useGetUserServicesQuery,
  usePaginationControls,
  BeautyCenterTreatmentsList,
  RestaurantMenuDishsList,
  ResturantMenuList,
  HealthCenterDoctorsList,
  VehiclesSelectableList,
} from "ui";
import { useTranslation } from "react-i18next";
import { ServicePresentationType, ServiceType } from "@features/API";
import { mapArray } from "@UI/../utils/src";

export const ServiceDetailsView: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { data: shop } = useGetShopDetailsQuery(userId);
  // const {
  //   data: services,
  //   isError,
  //   isLoading,
  // } = useGetMyServicesQuery(serviceId);

  const { changeTotalItems, controls, pagination } = usePaginationControls();
  const { data: services, isLoading: sericesIsLoading } =
    useGetUserServicesQuery(userId, pagination);

  const [serviceId, setServiceId] = React.useState<string>("test");
  const [selectedServicesids, setSelectedServicesIds] = React.useState<
    string[]
  >([]);

  const isError = false;
  const isLoading = false;

  const { t } = useTranslation();

  const serviceType = shop?.type || ServiceType.Hotel;

  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  const formatedDishs = services?.data?.reduce((acc, curr) => {
    const menu = acc.find((v) => v.menuName === curr.menuType);

    if (menu) {
      return acc
        .filter((v) => v.menuName !== curr.menuType)
        .concat([
          {
            menuName: curr.menuType || "",
            dishs: [...(menu?.dishs || []), menu],
          },
        ]);
    } else {
      return acc.concat([
        {
          menuName: curr.menuType || "",
          dishs: [curr],
        },
      ]);
    }
  }, [] as { menuName: string; dishs: typeof services["data"] }[]);

  return (
    <div className="flex flex-col gap-8 px-2 py-8">
      <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-between shadow p-4">
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4">
          <Image
            className="w-40 h-28 sm:h-20 sm:w-28 rounded-xl object-cover"
            src={shop ? shop.thumbnail : ""}
          />
          <div className="flex flex-col">
            <p className=" font-bold text-xl">{shop ? shop.name : null}</p>
            <div className="flex text-black gap-1 items-center">
              <LocationOnPointFillIcon />
              {shop ? (
                <p>
                  {shop.location.city}, {shop.location.country}
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
        data={
          shop
            ? shop.images.map((v) => ({
                src: v,
                type: ServicePresentationType.Img,
              })) || []
            : []
        }
      />
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        {shop ? (
          <ServicesProviderHeader
            rating={shop.rating}
            reviewsCount={shop.reviews}
            serviceTitle={shop.name}
            // travelPeriod={{ arrival: new Date(), departure: new Date() }}
          />
        ) : null}
      </SpinnerFallback>
      <StaticSideBarWrapper
        sidebar={() => {
          if (serviceId) {
            return (
              <ServiceReservastionForm
                sellerId={shop?.ownerId!}
                selectedServicesIds={selectedServicesids}
                serviceId={serviceId}
              />
            );
          } else {
            return (
              <div className="w-full flex justify-center items-center p-8">
                {t("Please select a service to book")}
              </div>
            );
          }
        }}
      >
        <SimpleTabs>
          <HStack>
            <SimpleTabHead>
              <ServiceDetailsTabHead title={t("Description")} />
              <ServiceDetailsTabHead title={t("Contact")} />
              <ServiceDetailsTabHead title={t("Policies")} />
              <ServiceDetailsTabHead title={t("Working hours")} />
              {showOn([ServiceType.Hotel]) ? (
                <ServiceDetailsTabHead title={t("Rooms")} />
              ) : null}
              <ServiceDetailsTabHead title={t("Localization")} />
              <ServiceDetailsTabHead title={t("Customer reviews")} />
            </SimpleTabHead>
          </HStack>
          <SimpleTabItemList>
            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop ? (
                <div className="flex flex-col gap-8">
                  <ServicesProviderDescriptionSection
                    description={shop.description}
                    // bathrooms={2}
                    // bedrooms={3}
                    // bikes={3}
                    // cars={2}
                    // pets={1}
                  />
                </div>
              ) : null}
            </SpinnerFallback>

            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop ? (
                <>
                  <ServiceReachOutSection
                    email={shop.email}
                    location={shop.location}
                    telephone={shop.phone}
                  />
                </>
              ) : null}
            </SpinnerFallback>

            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop ? (
                <>
                  <ServicePoliciesSection
                    title={"Check-in Checsdkout Terms"}
                    // deposit={15}
                    policies={[]}
                  />
                </>
              ) : null}
            </SpinnerFallback>

            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop && shop.workingSchedule ? (
                <>
                  <SellerServiceWorkingHoursSection
                    workingDays={Object.values(shop?.workingSchedule?.weekdays)}
                  />
                </>
              ) : null}
            </SpinnerFallback>

            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop ? (
                <>
                  {showOn([ServiceType.Hotel]) ? (
                    <HotelServiceRoomsSection
                      rooms={
                        services?.data.map((v) => ({
                          bathrooms: v.bathrooms,
                          beds: v.beds,
                          pricePerNight: v.price,
                        })) || []
                      }
                    />
                  ) : null}
                  {showOn([ServiceType.BeautyCenter]) ? (
                    <BeautyCenterTreatmentsList
                      treatments={services?.data.map((v) => ({
                        id: v.id,
                        price: v.price,
                        title: v.name,
                        duration: v.__typename,
                        thumbnail: v.thumbnail,
                      }))}
                      cancelation={[]}
                    />
                  ) : null}
                  {showOn([ServiceType.Restaurant]) ? (
                    <ResturantMenuList
                      onMenuListChange={}
                      menu={
                        formatedDishs?.map((v) => ({
                          name: v.menuName,
                          dishs: v.dishs.map((e) => ({
                            name: e.name,
                            thumbnail: e.thumbnail,
                            price: e.price,
                            ingredints: e.ingredients,
                            qty: v.dishs.filter((d) => d.id === e.id).length,
                          })),
                        })) || []
                      }
                    />
                  ) : null}
                  {showOn([ServiceType.HealthCenter]) ? (
                    <HealthCenterDoctorsList
                      doctors={mapArray(services?.data || [], (v) => ({
                        description: v.description,
                        name: v.name,
                        price: v.price,
                        rating: v.rating,
                        id: v.id,
                        thumbnail: v.thumbnail,
                        speciality: v.speciality || "",
                      }))}
                      cancelation={[]}
                    />
                  ) : null}
                  {showOn([ServiceType.Vehicle]) ? (
                    <VehiclesSelectableList
                      vehicles={mapArray(services?.data, (v) => ({
                        id: v.id,
                        brand: v.brand,
                        model: v.model,
                        price: v.price,
                        title: v.name,
                      }))}
                    />
                  ) : null}
                  {showOn([ServiceType.Hotel]) ? (
                    <HotelServiceRoomsSection rooms={} />
                  ) : null}
                </>
              ) : null}
            </SpinnerFallback>

            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop ? (
                <>
                  <ServiceOnMapLocalizationSection location={shop.location} />
                </>
              ) : null}
            </SpinnerFallback>

            <SpinnerFallback isLoading={isLoading} isError={isError}>
              {shop ? (
                <>
                  {/* TODO: BIND SERVICE RATING */}
                  <ServiceDetailsReviewsSection
                    overAllRating={shop.rating}
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
          </SimpleTabItemList>
        </SimpleTabs>
      </StaticSideBarWrapper>
    </div>
  );
};

const ServiceDetailsTabHead: React.FC<{
  title: string;
  selected?: boolean;
}> = ({ title, selected, ...rest }) => (
  <p
    {...rest}
    className={`${
      selected ? "text-primary border-b" : ""
    } font-semibold px-4 py-1 cursor-pointer hover:border-b border-primary`}
  >
    {title}
  </p>
);
