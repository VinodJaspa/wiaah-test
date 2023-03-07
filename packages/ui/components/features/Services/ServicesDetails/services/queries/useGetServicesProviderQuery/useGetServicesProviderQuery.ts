import {
  Account,
  Exact,
  GetHotelServiceArgs,
  Hotel,
  HotelRoom,
  Maybe,
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
  WorkingSchedule,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { random } from "lodash";

export type GetQueryVariables = Exact<{
  args: GetHotelServiceArgs;
}>;

export type GetQuery = { __typename?: "Query" } & {
  getHotelService: { __typename?: "Hotel" } & Pick<
    Hotel,
    "createdAt" | "id" | "ownerId" | "updatedAt"
  > & {
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
      location: { __typename?: "ServiceLocation" } & Pick<
        ServiceLocation,
        "address" | "city" | "country" | "lat" | "lon" | "postalCode" | "state"
      >;
      rooms: Array<
        { __typename?: "HotelRoom" } & Pick<
          HotelRoom,
          | "reviews"
          | "rating"
          | "createdAt"
          | "dailyPrice"
          | "description"
          | "hotelId"
          | "id"
          | "includedAmenities"
          | "includedServices"
          | "pricePerNight"
          | "title"
          | "updatedAt"
          | "bathrooms"
          | "beds"
          | "num_of_rooms"
          | "sellerId"
        > & {
            cancelationPolicies: Array<
              { __typename?: "ServiceCancelationPolicy" } & Pick<
                ServiceCancelationPolicy,
                "cost" | "duration"
              >
            >;
            dailyPrices?: Maybe<
              { __typename?: "ServiceDailyPrices" } & Pick<
                ServiceDailyPrices,
                "fr" | "mo" | "sa" | "su" | "th" | "tu" | "we"
              >
            >;
            discount: { __typename?: "ServiceDiscount" } & Pick<
              ServiceDiscount,
              "units" | "value"
            >;
            extras?: Maybe<
              Array<
                { __typename?: "ServiceExtra" } & Pick<
                  ServiceExtra,
                  "cost" | "name"
                >
              >
            >;
            measurements: { __typename?: "ServicePropertyMeasurements" } & Pick<
              ServicePropertyMeasurements,
              "inFeet" | "inMeter"
            >;
            popularAmenities?: Maybe<
              Array<
                { __typename?: "ServiceAmenity" } & Pick<
                  ServiceAmenity,
                  "label" | "value"
                >
              >
            >;
          }
      >;
      serviceMetaInfo: { __typename?: "ServiceMetaInfo" } & Pick<
        ServiceMetaInfo,
        | "description"
        | "hashtags"
        | "metaTagDescription"
        | "metaTagKeywords"
        | "title"
      >;
      workingHours?: Maybe<
        { __typename?: "WorkingSchedule" } & Pick<WorkingSchedule, "id"> & {
            weekdays: { __typename?: "WeekdaysWorkingHours" } & {
              fr?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
              mo?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
              sa?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
              su?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
              th?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
              tu?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
              we?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
            };
          }
      >;
      contact: { __typename?: "ServiceContact" } & Pick<
        ServiceContact,
        "address" | "city" | "country" | "email" | "phone" | "state"
      >;
      owner: { __typename?: "Account" } & Pick<
        Account,
        "firstName" | "lastName" | "id" | "verified" | "email" | "photo"
      >;
    };
};

export const getServiceProviderQueryKey = (id: string) => [
  "servicesProvider",
  { id },
];
export const useGetServicesProviderQuery = (id: string) => {
  return useQuery(getServiceProviderQueryKey(id), async () => {
    const client = createGraphqlRequestClient();
    client.setQuery(`
  query get($args:GetHotelServiceArgs!){
    getHotelService(
        getHotelServiceArgs:$args
    ){
        createdAt
        id
        ownerId
        policies{
            policyTitle
            terms
        }
        presentations{
            src
            type
        }
         location{
            address
            city
            country
            lat
            lon
             postalCode
             state
        }
        rooms{
            cancelationPolicies{
                cost
                duration
            }
            reviews
            rating
            createdAt
            dailyPrice
            dailyPrices{
                fr
                mo
                sa
                su
                th
                tu
                we
            }
            description
            discount{
                units
                value
            }
            extras{
                cost
                name
            }
            hotelId
            id
            includedAmenities
            includedServices
            measurements{
                inFeet
                inMeter
            }
            popularAmenities{
                label
                value
            }
            pricePerNight
            title
            updatedAt
        }
        serviceMetaInfo{
            description
            hashtags
            metaTagDescription
            metaTagKeywords
            title
        }
        updatedAt
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
        }
        contact{
            address
            city
            country
            email
            phone
            state
        }
        owner{
            firstName
            lastName
            id
            verified
            email
            photo
        }
    }
  }
  `);

    const data: GetQuery["getHotelService"] = {
      createdAt: "2023-03-06T00:00:00Z",
      id: "12345",
      ownerId: "67890",
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
              cost: 50,
              duration: 60,
            },
          ],
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
              label: "Swimming pool",
              value: "yes",
            },
            {
              label: "Gym",
              value: "yes",
            },
          ],
          pricePerNight: 90,
          title: "Standard Room",
          updatedAt: "2023-03-06T00:00:00Z",
          bathrooms: 2,
          beds: 3,
          num_of_rooms: 2,
          sellerId: "",
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
      owner: {
        email: "email",
        firstName: "first",
        id: "id",
        lastName: "last",
        verified: true,
        photo: "photo",
      },
      workingHours: {
        id: "",
        weekdays: {
          fr: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
          mo: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
          sa: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
          su: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
          th: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
          tu: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
          we: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
        },
      },
    };

    return data;
  });
};
