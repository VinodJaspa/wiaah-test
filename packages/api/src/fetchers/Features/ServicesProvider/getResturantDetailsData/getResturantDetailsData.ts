import { AsyncReturnType, GqlResponse } from "types";
import { createGraphqlRequestClient } from "api/src/utils";
import {
  ServiceContact,
  ServiceLocation,
  ServiceMetaInfo,
  ServiceOwnerAccount,
  ServicePolicy,
  ServicePresentation,
  ServiceCancelationPolicy,
  WorkingSchedule,
} from "../getServiceProviderData";
import { GetRestaurantQuery, ServicePresentationType } from "ui";

type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type RestaurantMenu = {
  __typename?: "RestaurantMenu";
  id: Scalars["ID"];
  name: Scalars["String"];
  dishs: Array<RestaurantDish>;
};

export type RestaurantDish = {
  __typename?: "RestaurantDish";
  id: Scalars["ID"];
  name: Scalars["String"];
  price: Scalars["Float"];
  ingredients: Array<Scalars["String"]>;
  thumbnail: Scalars["String"];
};

export type Restaurant = {
  __typename?: "Restaurant";
  owner: ServiceOwnerAccount;
  contact: ServiceContact;
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  vat: Scalars["Int"];
  status: ServiceStatus;
  location: ServiceLocation;
  presentations: Array<ServicePresentation>;
  policies: Array<ServicePolicy>;
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  serviceMetaInfo: ServiceMetaInfo;
  payment_methods: Array<ServicePaymentMethods>;
  menus: Array<RestaurantMenu>;
  lowest_price: Scalars["Float"];
  highest_price: Scalars["Float"];
  setting_and_ambianceId: Scalars["ID"];
  establishmentTypeId: Scalars["ID"];
  cuisinesTypeId: Scalars["ID"];
  michelin_guide_stars: Scalars["Int"];
  workingHours: WorkingSchedule;
  description: Scalars["String"];
  name: Scalars["String"];
};
export enum ServiceStatus {
  InActive = "inActive",
  Active = "active",
  Suspended = "suspended",
}

export enum ServicePaymentMethods {
  CreditCard = "credit_card",
  Visa = "visa",
  Mastercard = "mastercard",
  Check = "check",
  Cash = "cash",
}

export type GetRestaurantInput = {
  id: Scalars["ID"];
};

// export type GetResturantServiceDetialsQuery = {
//   getResturantServiceDetialsData: Restaurant;
// };

export type GetResturantServiceDetialsQuery = GqlResponse<
  Restaurant,
  "getRestaurant"
>;

export const getResturantServiceDetialsData = async (
  id: string
): Promise<GqlResponse<Restaurant, "getRestaurant">> => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getRestaurant($args:GetRestaurantInput!){
    getRestaurant(
        getRestaurantArgs:$args
    ){
        cuisinesTypeId
        establishmentTypeId
        highest_price
        id
        description
        name
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
        menus{
            dishs{
                id
                ingredients
                price
                name
                thumbnail
            }
            id
            name
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
        serviceMetaInfo{
            description
            hashtags
            metaTagDescription
            title
            metaTagKeywords
        }
        setting_and_ambianceId
        status
        vat
        contact {
            address
            city
            country
            email
            phone
            state
        }
        owner {
            firstName
            lastName
            id
            photo
            verified
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
        }
    }
}
`);

  // const date: GetResturantServiceDetialsQuery["getResturantServiceDetialsData"] =
  // {
  //   __typename: "Restaurant",
  //   owner: {
  //     __typename: "Account",
  //     id: "owner1",
  //     firstName: "John",
  //     lastName: "Doe",
  //     email: "john.doe@example.com",
  //     verified: true,
  //     photo: "https://example.com/photo.jpg",
  //   },
  //   contact: {
  //     __typename: "ServiceContact",
  //     address: "123 Main St",
  //     country: "Sample Country",
  //     state: "Sample State",
  //     city: "Sample City",
  //     email: "contact@restaurant.com",
  //     phone: "+1234567890",
  //   },
  //   id: "restaurant1",
  //   ownerId: "owner1",
  //   vat: 123456789,
  //   status: ServiceStatus.Active,
  //   location: {
  //     __typename: "ServiceLocation",
  //     address: "123 Main St",
  //     country: "Sample Country",
  //     state: "Sample State",
  //     city: "Sample City",
  //     lat: 12.345678,
  //     lon: 98.765432,
  //     postalCode: 12345,
  //   },
  //   presentations: [
  //     {
  //       __typename: "ServicePresentation",
  //       type: ServicePresentationType.Img,
  //       src: "https://example.com/image1.jpg",
  //     },
  //     {
  //       __typename: "ServicePresentation",
  //       type: ServicePresentationType.Vid,
  //       src: "https://example.com/video1.mp4",
  //     },
  //   ],
  //   policies: [
  //     {
  //       __typename: "ServicePolicy",
  //       policyTitle: "Reservation Policy",
  //       terms: [
  //         "Reservations must be made at least 24 hours in advance.",
  //         "No-shows will be charged a fee.",
  //       ],
  //     },
  //   ],
  //   cancelationPolicies: [
  //     {
  //       __typename: "ServiceCancelationPolicy",
  //       duration: 48,
  //       cost: 20,
  //     },
  //   ],
  //   serviceMetaInfo: {
  //     __typename: "ServiceMetaInfo",
  //     title: "Gourmet Delight",
  //     description:
  //       "A fine dining experience with a mix of modern and traditional cuisines.",
  //     metaTagDescription: "Gourmet Delight - A fine dining experience.",
  //     metaTagKeywords: ["fine dining", "gourmet", "restaurant"],
  //     hashtags: ["#gourmet", "#finedining", "#restaurant"],
  //   },
  //   payment_methods: [
  //     ServicePaymentMethods.CreditCard,
  //     ServicePaymentMethods.Visa,
  //     ServicePaymentMethods.Mastercard,
  //     ServicePaymentMethods.Cash,
  //   ],
  //   menus: [
  //     {
  //       __typename: "RestaurantMenu",
  //       id: "menu1",
  //       name: "Main Menu",
  //       dishs: [
  //         {
  //           __typename: "RestaurantDish",
  //           id: "dish1",
  //           name: "Spaghetti Carbonara",
  //           price: 12.99,
  //           ingredients: ["Pasta", "Eggs", "Cheese", "Pancetta", "Pepper"],
  //           thumbnail: "https://example.com/dish1.jpg",
  //         },
  //         {
  //           __typename: "RestaurantDish",
  //           id: "dish2",
  //           name: "Margherita Pizza",
  //           price: 9.99,
  //           ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Basil"],
  //           thumbnail: "https://example.com/dish2.jpg",
  //         },
  //       ],
  //     },
  //   ],
  //   lowest_price: 9.99,
  //   highest_price: 29.99,
  //   setting_and_ambianceId: "setting1",
  //   establishmentTypeId: "establishment1",
  //   cuisinesTypeId: "cuisine1",
  //   michelin_guide_stars: 3,
  //   workingHours: {
  //     __typename: "WorkingSchedule",
  //     id: "schedule1",
  //     weekdays: {
  //       mo: {
  //         __typename: "ServiceDayWorkingHours",
  //         periods: ["08:00-12:00", "13:00-22:00"],
  //       },
  //       tu: {
  //         __typename: "ServiceDayWorkingHours",
  //         periods: ["08:00-12:00", "13:00-22:00"],
  //       },
  //       we: {
  //         __typename: "ServiceDayWorkingHours",
  //         periods: ["08:00-12:00", "13:00-22:00"],
  //       },
  //       th: {
  //         __typename: "ServiceDayWorkingHours",
  //         periods: ["08:00-12:00", "13:00-22:00"],
  //       },
  //       fr: {
  //         __typename: "ServiceDayWorkingHours",
  //         periods: ["08:00-12:00", "13:00-23:00"],
  //       },
  //       sa: {
  //         __typename: "ServiceDayWorkingHours",
  //         periods: ["08:00-12:00", "13:00-23:00"],
  //       },
  //       su: {
  //         __typename: "ServiceDayWorkingHours",
  //         periods: ["10:00-12:00", "13:00-20:00"],
  //       },
  //     },
  //   },
  //   description:
  //     "A fine dining experience with a mix of modern and traditional cuisines.",
  //   name: "Gourmet Delight",
  // };

  const res = await client.send<GetResturantServiceDetialsQuery>();
  if (!res.data) {
    throw new Error("Restaurant not found");
  }

  return res.data;
};
