import { FormatedSearchableFilter } from "api/src";
import { createGraphqlRequestClient } from "api/src/utils";
import { GqlResponse } from "types";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ServiceOwnerAccount = {
  __typename?: "Account";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  verified: Scalars["Boolean"];
  photo: Scalars["String"];
};

export type ServiceContact = {
  __typename?: "ServiceContact";
  address: Scalars["String"];
  country: Scalars["String"];
  state?: Maybe<Scalars["String"]>;
  city: Scalars["String"];
  email: Scalars["String"];
  phone: Scalars["String"];
};

export type Hotel = {
  __typename?: "Hotel";
  owner: ServiceOwnerAccount;
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  location: ServiceLocation;
  presentations: Array<ServicePresentation>;
  policies: Array<ServicePolicy>;
  serviceMetaInfo: ServiceMetaInfo;
  rooms: Array<HotelRoom>;
  contact: ServiceContact;
  workingHours: WorkingSchedule;
};

export type ServiceDayWorkingHours = {
  __typename?: "ServiceDayWorkingHours";
  periods: Array<Scalars["String"]>;
};

export type WeekdaysWorkingHours = {
  __typename?: "WeekdaysWorkingHours";
  mo?: Maybe<ServiceDayWorkingHours>;
  tu?: Maybe<ServiceDayWorkingHours>;
  we?: Maybe<ServiceDayWorkingHours>;
  th?: Maybe<ServiceDayWorkingHours>;
  fr?: Maybe<ServiceDayWorkingHours>;
  sa?: Maybe<ServiceDayWorkingHours>;
  su?: Maybe<ServiceDayWorkingHours>;
};

export type WorkingSchedule = {
  __typename?: "WorkingSchedule";
  id: Scalars["ID"];
  weekdays: WeekdaysWorkingHours;
};

export type HotelRoom = {
  __typename?: "HotelRoom";
  id: Scalars["ID"];
  hotel?: Maybe<Hotel>;
  hotelId: Scalars["ID"];
  sellerId: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  pricePerNight: Scalars["Int"];
  dailyPrice: Scalars["Boolean"];
  rating: Scalars["Float"];
  reviews: Scalars["Int"];
  dailyPrices?: Maybe<ServiceDailyPrices>;
  discount: ServiceDiscount;
  includedServices?: Maybe<Array<Scalars["String"]>>;
  popularAmenities?: Maybe<Array<ServiceAmenity>>;
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  extras?: Maybe<Array<ServiceExtra>>;
  includedAmenities?: Maybe<Array<Scalars["String"]>>;
  beds: Scalars["Int"];
  bathrooms: Scalars["Int"];
  num_of_rooms: Scalars["Int"];
  measurements: ServicePropertyMeasurements;
};

export type ServicePresentation = {
  __typename?: "ServicePresentation";
  type: ServicePresentationType;
  src: Scalars["String"];
};

export enum ServicePresentationType {
  Img = "img",
  Vid = "vid",
}

export type ServicePolicy = {
  __typename?: "ServicePolicy";
  policyTitle: Scalars["String"];
  terms: Array<Scalars["String"]>;
};

export type ServiceMetaInfo = {
  __typename?: "ServiceMetaInfo";
  title: Scalars["String"];
  description: Scalars["String"];
  metaTagDescription: Scalars["String"];
  metaTagKeywords: Array<Scalars["String"]>;
  hashtags: Array<Scalars["String"]>;
};

export type ServiceDailyPrices = {
  __typename?: "ServiceDailyPrices";
  mo: Scalars["Int"];
  tu: Scalars["Int"];
  we: Scalars["Int"];
  th: Scalars["Int"];
  fr: Scalars["Int"];
  sa: Scalars["Int"];
  su: Scalars["Int"];
};

export type ServiceDiscount = {
  __typename?: "ServiceDiscount";
  value: Scalars["Int"];
  units: Scalars["Int"];
};

export type ServiceAmenity = {
  __typename?: "ServiceAmenity";
  value: Scalars["String"];
  label: Scalars["String"];
};

export type ServiceCancelationPolicy = {
  __typename?: "ServiceCancelationPolicy";
  duration: Scalars["Int"];
  cost: Scalars["Int"];
  id: Scalars["String"];
};

export type ServiceExtra = {
  __typename?: "ServiceExtra";
  name: Scalars["String"];
  cost: Scalars["Int"];
};

export type ServicePropertyMeasurements = {
  __typename?: "ServicePropertyMeasurements";
  inFeet: Scalars["Int"];
  inMeter: Scalars["Int"];
};

export type ServiceLocation = {
  __typename?: "ServiceLocation";
  address: Scalars["String"];
  country: Scalars["String"];
  state: Scalars["String"];
  city: Scalars["String"];
  lat: Scalars["Float"];
  lon: Scalars["Float"];
  postalCode: Scalars["Int"];
};

export type GetHotelServiceArgs = {
  id: Scalars["ID"];
};

export const getServicesProviderDataFetcher = async (
  args: GetHotelServiceArgs,
): Promise<GqlResponse<Hotel, "getHotelService">> => {
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
  console.log("args", { args });
  const res = await client
    .setVariables({
      args,
    })
    .send<any>();
  console.log({ res });
  return { data: res as any };
};
