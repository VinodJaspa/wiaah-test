import { isDev } from "@UI/../utils/src";
import {
  Exact,
  GqlCursorPaginationInput,
  Maybe,
  RentalPropertyType,
  RentalTypeOfPlace,
  RestaurantDishType,
  Scalars,
  Service,
  ServiceAdaptation,
  ServiceCancelationType,
  ServiceDiscount,
  ServiceExtra,
  ServicePropertyMeasurements,
  ServiceRestriction,
  ServiceType,
  ServicesCursorPaginationResponse,
} from "@features/API";
import { useUserData } from "@src/index";
import { createGraphqlRequestClient } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export type GetUserServicesQueryVariables = Exact<{
  userId: Scalars["String"];
  pagination: GqlCursorPaginationInput;
}>;

export type GetUserServicesQuery = { __typename?: "Query" } & {
  getUserServices: { __typename?: "ServicesCursorPaginationResponse" } & Pick<
    ServicesCursorPaginationResponse,
    "cursor" | "hasMore"
  > & {
      data: Array<
        { __typename?: "Service" } & Pick<
          Service,
          | "id"
          | "name"
          | "reviews"
          | "rating"
          | "thumbnail"
          | "price"
          | "beds"
          | "bathrooms"
          | "brand"
          | "model"
          | "speciality"
          | "createdAt"
          | "num_of_rooms"
          | "type"
          | "menuType"
          | "treatmentCategory"
          | "ingredients"
          | "description"
          | "seats"
          | "windows"
          | "gpsAvailable"
          | "airCondition"
          | "lugaggeCapacity"
          | "maxSpeedInKm"
          | "includedAmenities"
          | "adaptedFor"
          | "treatmentCategoryId"
          | "sellerId"
          | "duration"
          | "cleaningFee"
          | "cancelable"
          | "cancelationPolicy"
          | "restriction"
          | "propertyType"
          | "typeOfPlace"
        > & {
            extras?: Maybe<
              Array<
                { __typename?: "ServiceExtra" } & Pick<
                  ServiceExtra,
                  "cost" | "name"
                >
              >
            >;
            measurements?: Maybe<
              { __typename?: "ServicePropertyMeasurements" } & Pick<
                ServicePropertyMeasurements,
                "inFeet" | "inMeter"
              >
            >;
            discount?: Maybe<
              { __typename?: "ServiceDiscount" } & Pick<
                ServiceDiscount,
                "units" | "value"
              >
            >;
            treatmentCategory?: string;
          }
      >;
    };
};

export const getUserServicesQueryKey = (
  args: GetUserServicesQueryVariables
) => ["myServices", { args }];
export const useGetUserServicesQuery = (
  userId: string,
  pagination: GetUserServicesQueryVariables["pagination"],
  options?: UseQueryOptions<
    unknown,
    unknown,
    GetUserServicesQuery["getUserServices"],
    any
  >
) => {
  return useQuery(
    getUserServicesQueryKey({ pagination, userId }),
    async () => {
      if (isDev) {
        const mockRes: GetUserServicesQuery["getUserServices"] = {
          data: [...Array(10)].map((_, i) => ({
            id: i.toString(),
            createdAt: new Date().toString(),
            description: "hotel room description placeholder",
            name: "Dolce Vita Villa",
            price: 130,
            rating: 4.5,
            reviews: 162,
            thumbnail:
              "https://www.amaviacollection.com/wp-content/uploads/2022/05/Villa-Gaia-1-scaled.jpeg",
            type: ServiceType.BeautyCenter,
            bathrooms: 3,
            beds: 4,
            brand: "Brand",
            num_of_rooms: 5,
            menuType: RestaurantDishType.Starter,
            ingredients: ["tomate", "onion"],
            duration: 45,
            measurements: {
              inFeet: 156,
              inMeter: 70,
            },
            model: "Model",
            speciality: "Dentist",
            discount: {
              units: 5,
              value: 10,
            },
            adaptedFor: [ServiceAdaptation.Children, ServiceAdaptation.NewBorn],
            treatmentCategory: "Facial",
            includedAmenities: ["wi-fi", "pool"],
            extras: [
              { name: "parking", cost: 40 },
              { name: "breakfast", cost: 20 },
            ],
            airCondition: true,
            gpsAvailable: true,
            lugaggeCapacity: 2,
            maxSpeedInKm: 160,
            seats: 5,
            windows: 4,
            treatmentCategoryId: "",
            sellerId: "",
            cleaningFee: 45,
            cancelable: true,
            cancelationPolicy: ServiceCancelationType.Moderate,
            propertyType: RentalPropertyType.Villa,
            restriction: [ServiceRestriction.Event, ServiceRestriction.Pets],
            typeOfPlace: RentalTypeOfPlace.Entire,
          })),
          cursor: "",
          hasMore: false,
        };
        return mockRes;
      }

      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `
query getUserServices($userId:String!, $pagination:GqlCursorPaginationInput!) {
  getUserServices(pagination:$pagination,userId:$userId) {
    cursor
    hasMore
    data {
      id
      sellerId
      name
      reviews
      rating
      thumbnail
      price
      beds
      bathrooms
      brand
      model
      speciality
      createdAt
      num_of_rooms
      type
      menuType
      treatmentCategory
      ingredients
      description
      seats
      windows
      gpsAvailable
      airCondition
      lugaggeCapacity
      maxSpeedInKm
      cleaningFee
      cancelable
      cancelationPolicy
      restriction
      propertyType
      typeOfPlace
      extras {
        cost
        name
      }
      includedAmenities
      measurements{
        inFeet
        inMeter
      }
      discount{
        units
        value
      }
      adaptedFor
      treatmentCategory
      duration
    }
  }
}
      `
        )
        .setVariables<GetUserServicesQueryVariables>({
          pagination,
          userId: userId,
        })
        .send<GetUserServicesQuery>();

      return res.data.getUserServices;
    },
    options
  );
};

export const useGetMyServicesQuery = (
  pagination: GetUserServicesQueryVariables["pagination"],
  options: Parameters<typeof useGetUserServicesQuery>[2]
) => {
  const { user } = useUserData();

  return useGetUserServicesQuery(user?.id!, pagination, {
    enabled: !!user?.id!,
    ...options,
  });
};
