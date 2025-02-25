import { Exact, Scalars } from "types";
import {
  ServiceCancelationPolicy,
  ServiceLocation,
  ServiceMetaInfo,
  ServicePolicy,
  Vehicle,
  VehicleProperties,
  VehicleService,
  ServicePresentation,
  ServicePaymentMethod,
  ServicePresentationType,
  ServiceContact,
  WorkingSchedule,
  Maybe,
  ServiceDayWorkingHours,
  ServiceWorkingSchedule,
  ServiceWeekdaysWorkingHours,
} from "@features/API";
import { useQuery } from "react-query";
import { Account } from "@features/API";
import { createGraphqlRequestClient, FormatedSearchableFilter } from "api";
import { random } from "lodash";

export type GetVehicleQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetVehicleQuery = { __typename?: "Query" } & {
  getVehicleServicebyId: { __typename?: "VehicleService" } & Pick<
    VehicleService,
    | "createdAt"
    | "id"
    | "ownerId"
    | "payment_methods"
    | "rating"
    | "totalReviews"
    | "updatedAt"
    | "vat"
  > & {
      cancelationPolicies: Array<
        { __typename?: "ServiceCancelationPolicy" } & Pick<
          ServiceCancelationPolicy,
          "cost" | "duration"
        >
      >;
      location: { __typename?: "ServiceLocation" } & Pick<
        ServiceLocation,
        "address" | "city" | "country" | "lat" | "lon" | "postalCode" | "state"
      >;
      contact: { __typename?: "ServiceContact" } & Pick<
        ServiceContact,
        "address" | "city" | "country" | "email" | "phone" | "state"
      >;

      workingHours?: Maybe<
        { __typename?: "WorkingSchedule" } & Pick<
          ServiceWorkingSchedule,
          "id"
        > & {
            weekdays: ServiceWeekdaysWorkingHours;
          }
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
      serviceMetaInfo: { __typename?: "ServiceMetaInfo" } & Pick<
        ServiceMetaInfo,
        | "description"
        | "hashtags"
        | "metaTagDescription"
        | "metaTagKeywords"
        | "title"
      >;
      vehicles: Array<
        { __typename?: "Vehicle" } & Pick<
          Vehicle,
          "brand" | "id" | "model" | "price" | "title"
        > & {
            cancelationPolicies: Array<
              { __typename?: "ServiceCancelationPolicy" } & Pick<
                ServiceCancelationPolicy,
                "cost" | "duration" | "id"
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
      >;
      owner: { __typename?: "Account" } & Pick<
        Account,
        "email" | "firstName" | "lastName" | "id" | "photo" | "verified"
      >;
    };
};

export const getVehicleProviderDetailsQueryKey = (
  filters: FormatedSearchableFilter,
) => ["vehicleServiceProviderDetails", { filters }];

export const useGetVehicleProviderDetailsQuery = (
  filters: FormatedSearchableFilter,
) => {
  return useQuery(getVehicleProviderDetailsQueryKey(filters), () => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
  query getVehicle(
    $id:String!
){
    getVehicleServicebyId(
        id:$id
    ) {
        cancelationPolicies{
            cost
            duration
        }
        createdAt
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
              contact{
            address
            city
            country
            email
            phone
            state
        }
        ownerId
        payment_methods
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
        policies{
            policyTitle
            terms
        }
        presentations{
            src
            type
        }
        rating
        serviceMetaInfo{
            description
            hashtags
            metaTagDescription
            metaTagKeywords
            title
        }
        totalReviews
        updatedAt
        vat
        vehicles{
            brand
            cancelationPolicies {
                cost
                duration
            }
            id
            model
            presentations {
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
        owner {
            email
            firstName
            lastName
            id
            email
            photo
            verified
        }
    }
}
`);

    const data: GetVehicleQuery["getVehicleServicebyId"] = {
      cancelationPolicies: [
        {
          cost: 20,
          duration: 24,
        },
      ],
      createdAt: "2022-01-01T00:00:00Z",
      id: "123",
      location: {
        address: "123 Main St",
        city: "New York",
        country: "USA",
        lat: 40.712776,
        lon: -74.005974,
        postalCode: 10001,
        state: "NY",
      },
      ownerId: "456",
      payment_methods: [
        ServicePaymentMethod.Cash,
        ServicePaymentMethod.CreditCard,
      ],
      contact: {
        address: "address",
        city: "city",
        country: "country",
        email: "email",
        phone: "1345",
        state: "state",
      },
      policies: [
        {
          policyTitle: "Cancellation Policy",
          terms: ["Cancellation must be made at least 24 hours in advance."],
        },
      ],
      presentations: [
        {
          src: "https://content-images.carmax.com/qeontfmijmzv/MY19MKj0XutK084z874jt/9632621fd8464b5c0e54a9dee64ad4e5/tesla.jpg",
          type: ServicePresentationType.Img,
        },
        {
          src: "https://www.autocar.co.uk/sites/autocar.co.uk/files/range-rover-2022-001-tracking-front.jpg",
          type: ServicePresentationType.Img,
        },
        {
          src: "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg",
          type: ServicePresentationType.Img,
        },
      ],
      rating: 4.5,
      serviceMetaInfo: {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        hashtags: ["car rental", "rent a car"],
        metaTagDescription: "Rent a car for your next trip",
        metaTagKeywords: ["car rental", " rent a car", "car hire"],
        title: "Rent a Car",
      },
      workingHours: {
        id: "",
        weekdays: {
          fr: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11)),
              ).toString(),
            ],
          },
          mo: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11)),
              ).toString(),
            ],
          },
          sa: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11)),
              ).toString(),
            ],
          },
          su: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11)),
              ).toString(),
            ],
          },
          th: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11)),
              ).toString(),
            ],
          },
          tu: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11)),
              ).toString(),
            ],
          },
          we: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11)),
              ).toString(),
            ],
          },
        },
      },
      totalReviews: 100,
      updatedAt: "2022-01-02T00:00:00Z",
      vat: 10,
      vehicles: [
        {
          brand: "Toyota",
          cancelationPolicies: [
            {
              cost: 10,
              duration: 12,
              id: "1",
            },
          ],
          id: "789",
          model: "Corolla",
          presentations: [
            {
              src: "https://hips.hearstapps.com/hmg-prod/images/2023-mclaren-artura-101-1655218102.jpg?crop=1.00xw:0.847xh;0,0.153xh&resize=1200:*",
              type: ServicePresentationType.Img,
            },
            {
              src: "https://imgd.aeplcdn.com/0x0/n/cw/ec/106785/exterior-right-front-three-quarter-2.jpeg?isig=0",
              type: ServicePresentationType.Img,
            },
          ],
          price: 50,
          properties: {
            airCondition: true,
            gpsAvailable: true,
            lugaggeCapacity: 2,
            maxSpeedInKm: 120,
            seats: 5,
            windows: 4,
          },
          title: "Toyota Corolla",
        },
        {
          brand: "Honda",
          cancelationPolicies: [
            {
              cost: 15,
              duration: 18,
              id: "1",
            },
          ],
          id: "ABC",
          model: "Accord",
          presentations: [
            {
              src: "https://www.usnews.com/object/image/00000184-2f95-db4d-a387-afdf94b80000/2020-chevrolet-camaross-001-1.jpg?update-time=1667566268348&size=responsive640",
              type: ServicePresentationType.Img,
            },
          ],
          price: 60,
          properties: {
            airCondition: true,
            gpsAvailable: true,
            lugaggeCapacity: 3,
            maxSpeedInKm: 140,
            seats: 5,
            windows: 4,
          },
          title: "Honda Accord",
        },
        {
          brand: "Toyota",
          cancelationPolicies: [
            {
              cost: 10,
              duration: 12,
              id: "1",
            },
          ],
          id: "789",
          model: "Corolla",
          presentations: [
            {
              src: "https://hips.hearstapps.com/hmg-prod/images/2023-mclaren-artura-101-1655218102.jpg?crop=1.00xw:0.847xh;0,0.153xh&resize=1200:*",
              type: ServicePresentationType.Img,
            },
            {
              src: "https://imgd.aeplcdn.com/0x0/n/cw/ec/106785/exterior-right-front-three-quarter-2.jpeg?isig=0",
              type: ServicePresentationType.Img,
            },
          ],
          price: 50,
          properties: {
            airCondition: true,
            gpsAvailable: true,
            lugaggeCapacity: 2,
            maxSpeedInKm: 120,
            seats: 5,
            windows: 4,
          },
          title: "Toyota Corolla",
        },
      ],
      owner: {
        email: "john@example.com",
        firstName: "John",
        lastName: "Doe",
        id: "",
        verified: true,
        photo: "",
      },
    };
    return data;
  });
};
