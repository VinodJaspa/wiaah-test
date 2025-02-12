import { ServicePaymentMethod, ServicePresentationType } from "@features/API";
import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "react-i18next";
import { dehydrate, QueryClient } from "react-query";
import { useRouting } from "routing";
import { ServerSideQueryClientProps } from "types";
import {
  getRandomImage,
  GetVehicleQuery,
  SellerLayout,
  VehicleServiceDetailsView,
} from "ui";

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps
> = async ({ query }) => {
  const id = query["id"];
  const client = new QueryClient();

  // if (id) {
  //   client.prefetchQuery(getVehicleProviderDetailsQueryKey({ id }), () =>
  //     getVehicleServiceProviderDetailsFetcher({ id }),
  //   );
  // }

  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
};

const FAKE_VEHICLE_DATA: GetVehicleQuery["getVehicleServicebyId"] = {
  __typename: "VehicleService",
  createdAt: "2023-01-01T00:00:00Z",
  id: "service123",
  ownerId: "owner123",
  payment_methods: [ServicePaymentMethod.Cash],
  rating: 4.5,
  totalReviews: 123,
  updatedAt: "2023-06-01T00:00:00Z",
  vat: 20,
  cancelationPolicies: [
    {
      __typename: "ServiceCancelationPolicy",
      cost: 50,
      duration: 24,
    },
  ],
  location: {
    __typename: "ServiceLocation",
    address: "123 Main St",
    city: "Anytown",
    country: "USA",
    lat: 40.7128,
    lon: -74.006,
    postalCode: 333,
    state: "NY",
  },
  contact: {
    __typename: "ServiceContact",
    address: "123 Main St",
    city: "Anytown",
    country: "USA",
    email: "contact@example.com",
    phone: "+1234567890",
    state: "NY",
  },
  workingHours: {
    __typename: "WorkingSchedule",
    id: "schedule123",
    weekdays: {
      fr: {
        periods: ["09:00", "17:00"],
      },
      mo: {
        periods: ["09:00", "17:00"],
      },
      sa: {
        periods: ["10:00", "14:00"],
      },
      su: {
        periods: ["10:00", "14:00"],
      },
      th: {
        periods: ["09:00", "17:00"],
      },
      tu: {
        periods: ["09:00", "17:00"],
      },
      we: {
        periods: ["09:00", "17:00"],
      },
    },
  },
  policies: [
    {
      __typename: "ServicePolicy",
      policyTitle: "No Smoking",
      terms: ["Smoking is prohibited inside the vehicles."],
    },
  ],
  presentations: [
    {
      src: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      type: ServicePresentationType.Img,
    },
    {
      src: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      type: ServicePresentationType.Img,
    },
  ],
  serviceMetaInfo: {
    __typename: "ServiceMetaInfo",
    description: "Best car rental service in town.",
    hashtags: ["#car", "#rental"],
    metaTagDescription: "Car rental service",
    metaTagKeywords: ["car", "rental", "service"],
    title: "Car Rental Service",
  },
  vehicles: [
    {
      __typename: "Vehicle",
      brand: "Toyota",
      id: "vehicle123",
      model: "Camry",
      price: 100,
      title: "Toyota Camry",
      cancelationPolicies: [
        {
          __typename: "ServiceCancelationPolicy",
          cost: 30,
          duration: 12,
        },
      ],
      presentations: [
        {
          __typename: "ServicePresentation",
          type: ServicePresentationType.Img,
          src: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ],
      properties: {
        __typename: "VehicleProperties",
        airCondition: true,
        gpsAvailable: true,
        lugaggeCapacity: 3,
        maxSpeedInKm: 200,
        seats: 5,
        windows: 4,
      },
    },
  ],
  owner: {
    __typename: "Account",
    email: "owner@example.com",
    firstName: "John",
    lastName: "Doe",
    id: "owner123",
    photo: getRandomImage(),
    verified: true,
  },
};

const VehicleServiceDetailsPage: NextPage = () => {
  const { t } = useTranslation();
  const { getParam } = useRouting();
  const id = getParam("id");
  // const {
  //   data: _res,
  //   isLoading,
  //   isError,
  // } = useGetVehicleProviderDetailsQuery({
  //   id,
  // });
  const res = FAKE_VEHICLE_DATA;
  return (
    <>
      {/* <MetaTitle
        content={`${t("Vehicle Details")} | ${res ? res?.serviceMetaInfo?.title || "" : ""
          }`}
      /> */}

      <SellerLayout>
        <VehicleServiceDetailsView vehicleData={res} />
      </SellerLayout>
    </>
  );
};

export default VehicleServiceDetailsPage;
