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

  client.setVariables({
    id,
  });

  return client.send();
};
