import { ServicePresentationCarosuel } from "@UI/components/features/Services/ServicesDetails/components/DataDisplay/ServicePresentationCarosuel";
import { ServiceReservastionForm } from "@UI/components/features/Services/ServicesDetails/components/Forms/ServiceReservastion";
import { ServicesProviderHeader } from "@UI/components/features/Services/ServicesDetails/components/Headers/ServicesProviderHeader";
import { ServiceOnMapLocalizationSection } from "@UI/components/features/Services/ServicesDetails/components/Sections/ServiceLocatlizationSection";
import { ServicePoliciesSection } from "@UI/components/features/Services/ServicesDetails/components/Sections/ServicePoliciesSection";
import { ServiceReachOutSection } from "@UI/components/features/Services/ServicesDetails/components/Sections/ServiceReachOutSection";
import { VehiclesSelectableList } from "@UI/components/features/Services/Vehicle/components/Lists/VehiclesSelectableList";
import { VehicleServiceDescriptionSection } from "@UI/components/features/Services/Vehicle/components/Sections/VehicleServiceDescriptionSection";
import { SellerServiceWorkingHoursSection } from "@UI/components/features/Services/components/Sections/SellerServiceWorkingHoursSection";
import { ServiceDetailsReviewsSection } from "@UI/components/features/Services/components/Sections/ServiceDetailsReviewsSection";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  GetVehicleQuery,
  ServicesProviderDetailsTabs,
  SpinnerFallback,
  StaticSideBarWrapper,
} from "ui";

type VehicleServiceDetailsViewProps = {
  vehicleData: GetVehicleQuery["getVehicleServicebyId"];
  selectedTab?: number;
};

export const VehicleServiceDetailsView: React.FC<
  VehicleServiceDetailsViewProps
> = ({ vehicleData, selectedTab = 0 }) => {
  const { getParam } = useRouting();
  const id = getParam("id");
  // WARNING: grqphql endpoint query is not
  // const {
  //   data: _res,
  //   isError,
  //   isLoading,
  // } = useGetVehicleProviderDetailsQuery({ id });

  const res = vehicleData;
const { t } = useTranslation();

  const ServicesProviderTabs: { name: string; component: React.ReactNode }[] =
    React.useMemo(
      () => [
        {
          name: "Description",
          component: (
            <SpinnerFallback isLoading={false}>
              {res ? (
                <div className="flex flex-col gap-8">
                  <VehicleServiceDescriptionSection
                    description={res.serviceMetaInfo.description}
                    GPS
                    airCondition
                    maxSpeed={240}
                    seats={4}
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
                    title={"Health Center Policies and terms"}
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
          name: "Vehicles",
          component: (
            <SpinnerFallback isLoading={false}>
              {res ? <VehiclesSelectableList vehicles={res.vehicles} /> : null}
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
      <ServicePresentationCarosuel data={res ? res.presentations || [] : []} />
      <SpinnerFallback isLoading={false}>
        {res ? (
          <ServicesProviderHeader
            rating={res.rating}
            reviewsCount={res.totalReviews}
            serviceTitle={res.serviceMetaInfo.title}
          />
        ) : null}
      </SpinnerFallback>
      <StaticSideBarWrapper
        sidebar={
          <ServiceReservastionForm sellerId={""} selectedServicesIds={[]} />
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
