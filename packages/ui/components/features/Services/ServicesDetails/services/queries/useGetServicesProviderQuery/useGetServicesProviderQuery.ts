import {
  Account,
  Dish,
  Doctor,
  Exact,
  HealthCenterSpecialty,
  Hotel,
  HotelRoom,
  Maybe,
  Scalars,
  ServiceAmenity,
  ServiceCancelationPolicy,
  ServiceContact,
  ServiceDailyPrices,
  ServiceDayWorkingHours,
  ServiceDiscount,
  ServiceExtra,
  ServiceLocation,
  ServiceMetaInfo,
  ServicePolicy,
  ServicePresentation,
  ServicePresentationType,
  ServicePropertyMeasurements,
  Treatment,
  ServiceShopRaw,
  BeautyCenterTreatmentCategory,
  RestaurantMenu,
  Vehicle,
  VehicleProperties,
  ServiceTypeOfSeller,
  ServiceWorkingSchedule,
  ServiceWeekdaysWorkingHours,
} from "@features/API";
import { useQuery } from "react-query";
import { random } from "lodash";
import { createGraphqlRequestClient, WeekdaysWorkingHours } from "api";
import { FaWaveSquare } from "react-icons/fa";
import { CgGym } from "react-icons/cg";

export type GetServiceDetailsQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetServiceDetailsQuery = { __typename?: "Query" } & {
  getServiceDetails?: Maybe<
    { __typename?: "ServiceDetails" } & Pick<
      ServiceShopRaw,
      | "createdAt"
      | "cuisinesTypeId"
      | "establishmentTypeId"
      | "highest_price"
      | "id"
      | "lowest_price"
      | "michelin_guide_stars"
      | "ownerId"
      | "payment_methods"
      | "setting_and_ambianceId"
      | "type_of_seller"
      | "updatedAt"
    > & {
        contact: { __typename?: "ServiceContact" } & Pick<
          ServiceContact,
          "address" | "city" | "country" | "email" | "phone" | "state"
        >;
        doctors?: Maybe<
          Array<
            { __typename?: "Doctor" } & Pick<
              Doctor,
              | "availablityStatus"
              | "description"
              | "healthCenterId"
              | "id"
              | "name"
              | "price"
              | "rating"
              | "thumbnail"
              | "specialityId"
            > & {
                speciality?: Maybe<
                  { __typename?: "HealthCenterSpecialty" } & Pick<
                    HealthCenterSpecialty,
                    "description" | "id" | "name"
                  >
                >;
              }
          >
        >;
        location: { __typename?: "ServiceLocation" } & Pick<
          ServiceLocation,
          | "address"
          | "city"
          | "country"
          | "lat"
          | "lon"
          | "postalCode"
          | "state"
        >;
        menus?: Maybe<
          Array<
            { __typename?: "RestaurantMenu" } & Pick<
              RestaurantMenu,
              "id" | "name"
            > & {
                dishs: Array<
                  { __typename?: "Dish" } & Pick<
                    Dish,
                    "id" | "ingredients" | "name" | "price" | "thumbnail"
                  >
                >;
              }
          >
        >;
        policies: Array<
          { __typename?: "ServicePolicy" } & Pick<
            ServicePolicy,
            "policyTitle" | "terms"
          >
        >;
        presentations: Array<
          { __typename?: "ServicePresentation" } & Pick<
            ServicePresentation,
            "src" | "type"
          >
        >;
        popularAmenities?: Maybe<
          Array<
            { __typename?: "ServiceAmenity" } & Pick<
              ServiceAmenity,
              "label" | "value"
            >
          >
        >;
        rooms?: Maybe<
          Array<
            { __typename?: "HotelRoom" } & Pick<
              HotelRoom,
              | "bathrooms"
              | "beds"
              | "createdAt"
              | "dailyPrice"
              | "description"
              | "hotelId"
              | "id"
              | "includedAmenities"
              | "includedServices"
              | "num_of_rooms"
              | "pricePerNight"
              | "rating"
              | "updatedAt"
              | "title"
              | "sellerId"
              | "reviews"
              | "adaptedFor"
              | "title"
              | "pricePerNight"
              | "thumbnail"
              | "includedAmenities"
              | "fees"
            > & {
                cancelationPolicies?: Array<
                  { __typename?: "ServiceCancelationPolicy" } & Pick<
                    ServiceCancelationPolicy,
                    "id" | "cost" | "duration"
                  >
                >;
                discount?: { __typename?: "ServiceDiscount" } & Pick<
                  ServiceDiscount,
                  "units" | "value"
                >;
                dailyPrices?: Maybe<
                  { __typename?: "ServiceDailyPrices" } & Pick<
                    ServiceDailyPrices,
                    "fr" | "mo" | "sa" | "su" | "th" | "tu" | "we"
                  >
                >;
                extras?: Maybe<
                  Array<
                    { __typename?: "ServiceExtra" } & Pick<
                      ServiceExtra,
                      "cost" | "name"
                    >
                  >
                >;
                measurements?: {
                  __typename?: "ServicePropertyMeasurements";
                } & Pick<ServicePropertyMeasurements, "inFeet" | "inMeter">;
                popularAmenities?: Maybe<
                  Array<
                    { __typename?: "ServiceAmenity" } & Pick<
                      ServiceAmenity,
                      "label" | "value" | "slug"
                    >
                  >
                >;
                presentations: Array<
                  { __typename?: "ServicePresentation" } & Pick<
                    ServicePresentation,
                    "src" | "type"
                  >
                >;
              }
          >
        >;
        serviceMetaInfo: { __typename?: "ServiceMetaInfo" } & Pick<
          ServiceMetaInfo,
          | "description"
          | "hashtags"
          | "metaTagDescription"
          | "metaTagKeywords"
          | "title"
        >;
        treatments?: Maybe<
          Array<
            { __typename?: "Treatment" } & Pick<
              Treatment,
              | "beautyCenterServiceId"
              | "duration"
              | "id"
              | "price"
              | "thumbnail"
              | "title"
              | "treatmentCategoryId"
            > & {
                category?: Maybe<
                  { __typename?: "BeautyCenterTreatmentCategory" } & Pick<
                    BeautyCenterTreatmentCategory,
                    "createdAt" | "createdById" | "id" | "title"
                  >
                >;
                discount: { __typename?: "ServiceDiscount" } & Pick<
                  ServiceDiscount,
                  "units" | "value"
                >;
              }
          >
        >;
        vehicles?: Maybe<
          Array<
            { __typename?: "Vehicle" } & Pick<
              Vehicle,
              "brand" | "id" | "model" | "price" | "title"
            > & {
                cancelationPolicies: Array<
                  { __typename?: "ServiceCancelationPolicy" } & Pick<
                    ServiceCancelationPolicy,
                    "cost" | "duration"
                  >
                >;
                presentations: Array<
                  { __typename?: "ServicePresentation" } & Pick<
                    ServicePresentation,
                    "src" | "type"
                  >
                >;
                properties: { __typename?: "VehicleProperties" } & Pick<
                  VehicleProperties,
                  | "airCondition"
                  | "gpsAvailable"
                  | "lugaggeCapacity"
                  | "maxSpeedInKm"
                  | "seats"
                  | "windows"
                >;
              }
          >
        >;
        workingHours?: Maybe<
          { __typename?: "WorkingSchedule" } & Pick<
            ServiceWorkingSchedule,
            "id"
          > & {
              weekdays: ServiceWeekdaysWorkingHours;
            }
        >;
      }
  >;
};

export const getServiceProviderQueryKey = (id: string) => [
  "servicesProvider",
  { id },
];
export const useGetServicesProviderQuery = (id: string) => {
  return useQuery(getServiceProviderQueryKey(id), async () => {
    const client = createGraphqlRequestClient();
    client.setQuery(`
query GetServiceDetails($id:String!){
  getServiceDetails(id:$id){
    contact{
      address
      city
      country
      email
      phone
      state
    }
    createdAt
    cuisinesTypeId
    doctors{
      availablityStatus
      description
      healthCenterId
      id
      name
      price
      rating
      thumbnail
      specialityId
      speciality{
        description
        id
        name
      }
    }
    establishmentTypeId
    highest_price
    id
    location{
      address
      city
      country
      lat
      lon
      postalCode
      state
    }
    lowest_price
    menus {
      id
      name
      dishs{
        id
        ingredients
        name
        price
        thumbnail
      }
    }
    michelin_guide_stars
    ownerId
    payment_methods
    policies{
      policyTitle
      terms
    }
    presentations{
      src
      type
    }
    rooms{
      bathrooms
      beds
      cancelationPolicies{
        cost
        duration
      }
      createdAt
      dailyPrice
      description
      discount {
        units
        value
      }
      dailyPrices{
        fr
        mo
        sa
        su
        th
        tu
        we
      }
      extras{
        cost
        name
      }
      hotelId
      id
      includedAmenities
      includedServices
      measurements {
        inFeet
        inMeter
      }
      num_of_rooms
      popularAmenities {
        label
        value
      }
      presentations {
        src
        type
      }
      pricePerNight
      rating
      updatedAt
      title
      sellerId
      reviews
    }
    serviceMetaInfo{
      description
      hashtags
      metaTagDescription
      metaTagKeywords
      title
    }
    setting_and_ambianceId
    treatments{
      beautyCenterServiceId
      category{
        createdAt
        createdById
        id
        title
      }
      discount{
        units
        value
      }
      duration
      id
      price
      thumbnail
      title
      treatmentCategoryId
    }
    type_of_seller
    updatedAt
    vehicles {
      brand
      cancelationPolicies{
        cost
        duration
      }
      id
      model
      presentations{
        src
        type
      }
      price
      properties{
        airCondition
        gpsAvailable
        lugaggeCapacity
        maxSpeedInKm
        seats
        windows
      }
      title
    }
    workingHours {
      id
      weekdays{
        fr{
          periods
        }
        mo{
          periods
        }
        sa{
          periods
        }
        su{
          periods
        }
        th{
          periods
        }
        tu{
          periods
        }
        we{
          periods
        }
      }
      specialDays{
        date
        workingHours{
          periods
        }
      }
    }
  }
}
  `);

    const data: GetServiceDetailsQuery["getServiceDetails"] = {
      createdAt: "2023-03-06T00:00:00Z",
      id: "12345",
      ownerId: "67890",
      cuisinesTypeId: "543",
      establishmentTypeId: "423",
      highest_price: 500,
      lowest_price: 100,
      michelin_guide_stars: 3,
      payment_methods: [],
      setting_and_ambianceId: "44",
      type_of_seller: ServiceTypeOfSeller.Individual,

      policies: [
        {
          policyTitle: "Cancellation Policy",
          terms: ["Full refund if canceled within 24 hours"],
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
      location: {
        address: "123 Main St",
        city: "Anytown",
        country: "USA",
        lat: 37.7749,
        lon: -122.4194,
        postalCode: 12345,
        state: "CA",
      },
      rooms: [
        {
          cancelationPolicies: [
            {
              id: "1",
              cost: 50,
              duration: 60,
            },
          ],
          presentations: [],
          reviews: 15,
          rating: 4.5,
          createdAt: "2023-03-05T00:00:00Z",
          dailyPrice: true,
          dailyPrices: {
            fr: 90,
            mo: 100,
            sa: 110,
            su: 120,
            th: 95,
            tu: 105,
            we: 100,
          },
          description: "Cozy room with a view",
          discount: {
            units: 3,
            value: 10,
          },
          extras: [
            {
              cost: 20,
              name: "Mini-bar",
            },
            {
              cost: 10,
              name: "Late check-out",
            },
          ],
          hotelId: "67890",
          id: "54321",
          includedAmenities: ["Free Wi-Fi", "Parking"],
          includedServices: ["Room cleaning", "Towels"],
          measurements: {
            inFeet: 15,
            inMeter: 20,
          },
          popularAmenities: [
            {
              label: "Breakfast",
              value: "yes",
              slug: "breakfast",
            },
            {
              label: "Laundry",
              value: "yes",
              slug: "laundry",
            },
            {
              label: "balcony",
              value: "yes",
              slug: "Balcony",
            },
          ],
          pricePerNight: 90,
          title: "Standard Room",
          updatedAt: "2023-03-06T00:00:00Z",
          bathrooms: 2,
          beds: 3,
          num_of_rooms: 2,
          sellerId: "",
          thumbnail: "",
        },
      ],
      serviceMetaInfo: {
        description: "A great hotel in a prime location",
        hashtags: ["#travel", "#vacation", "#hotel"],
        metaTagDescription:
          "Book your stay at our hotel and enjoy great amenities and services",
        metaTagKeywords: ["hotel, travel, vacation"],
        title: "Book Your Stay at Our Hotel",
      },
      updatedAt: "2023-03-06T00:00:00Z",
      contact: {
        address: "address",
        city: "city",
        country: "country",
        email: "email",
        phone: "123456789",
        state: "state",
      },
    };

    return data;
  });
};
