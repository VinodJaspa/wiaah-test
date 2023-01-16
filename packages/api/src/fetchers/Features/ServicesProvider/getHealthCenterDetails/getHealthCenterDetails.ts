import {
  createGraphqlRequestClient,
  FormatedSearchableFilter,
  ServiceOwnerAccount,
} from "api";
import { AsyncReturnType, GqlResponse } from "types";
import { randomNum } from "utils";
import {
  HealthCenterDetailtsApiResponseValidationSchema,
  HealthCenterDetailsValidationSchema,
  InferType,
  HealthCenterDoctorMetaDataValidationSchema,
  CheckValidation,
} from "validation";

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
};

export type HealthCenterSpecialty = {
  __typename?: "HealthCenterSpecialty";
  id: Scalars["ID"];
  doctors?: Maybe<Array<HealthCenterDoctor>>;
  name: Scalars["String"];
  description: Scalars["String"];
};

export type HealthCenterDoctor = {
  __typename?: "HealthCenterDoctor";
  id: Scalars["ID"];
  healthCenter?: Maybe<HealthCenter>;
  speciality?: Maybe<HealthCenterSpecialty>;
  healthCenterId: Scalars["ID"];
  specialityId: Scalars["ID"];
  rating: Scalars["Float"];
  name: Scalars["String"];
  thumbnail: Scalars["String"];
  price: Scalars["Float"];
  description: Scalars["String"];
  availablityStatus: HealthCenterDoctorAvailablityStatus;
};

export enum HealthCenterDoctorAvailablityStatus {
  Available = "available",
  Unavailable = "unavailable",
}

export type HealthCenter = {
  __typename?: "HealthCenter";
  owner?: Maybe<ServiceOwnerAccount>;
  contact: ServiceContact;
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  vat: Scalars["Float"];
  rating: Scalars["Float"];
  totalReviews: Scalars["Int"];
  location: ServiceLocation;
  status: ServiceStatus;
  presentations: Array<ServicePresentation>;
  policies: Array<ServicePolicy>;
  serviceMetaInfo: ServiceMetaInfo;
  payment_methods: Array<ServicePaymentMethods>;
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  doctors: Array<HealthCenterDoctor>;
  workingHours: WorkingSchedule;
};

type ServiceDayWorkingHours = {
  __typename?: "ServiceDayWorkingHours";
  periods: Array<Scalars["String"]>;
};

type WeekdaysWorkingHours = {
  __typename?: "WeekdaysWorkingHours";
  mo?: Maybe<ServiceDayWorkingHours>;
  tu?: Maybe<ServiceDayWorkingHours>;
  we?: Maybe<ServiceDayWorkingHours>;
  th?: Maybe<ServiceDayWorkingHours>;
  fr?: Maybe<ServiceDayWorkingHours>;
  sa?: Maybe<ServiceDayWorkingHours>;
  su?: Maybe<ServiceDayWorkingHours>;
};

type WorkingSchedule = {
  __typename?: "WorkingSchedule";
  id: Scalars["ID"];
  weekdays: WeekdaysWorkingHours;
};

type ServiceContact = {
  __typename?: "ServiceContact";
  address: Scalars["String"];
  country: Scalars["String"];
  state?: Maybe<Scalars["String"]>;
  city: Scalars["String"];
  email: Scalars["String"];
  phone: Scalars["String"];
};

type ServiceLocation = {
  __typename?: "ServiceLocation";
  address: Scalars["String"];
  country: Scalars["String"];
  state: Scalars["String"];
  city: Scalars["String"];
  lat: Scalars["Float"];
  lon: Scalars["Float"];
  postalCode: Scalars["Int"];
};

enum ServiceStatus {
  InActive = "inActive",
  Active = "active",
  Suspended = "suspended",
}

type ServicePresentation = {
  __typename?: "ServicePresentation";
  type: ServicePresentationType;
  src: Scalars["String"];
};

enum ServicePresentationType {
  Img = "img",
  Vid = "vid",
}

type ServicePolicy = {
  __typename?: "ServicePolicy";
  policyTitle: Scalars["String"];
  terms: Array<Scalars["String"]>;
};

type ServiceMetaInfo = {
  __typename?: "ServiceMetaInfo";
  title: Scalars["String"];
  description: Scalars["String"];
  metaTagDescription: Scalars["String"];
  metaTagKeywords: Array<Scalars["String"]>;
  hashtags: Array<Scalars["String"]>;
};

enum ServicePaymentMethods {
  CreditCard = "credit_card",
  Visa = "visa",
  Mastercard = "mastercard",
  Check = "check",
  Cash = "cash",
}

type ServiceCancelationPolicy = {
  __typename?: "ServiceCancelationPolicy";
  duration: Scalars["Int"];
  cost: Scalars["Int"];
};

export const getHealthCenterDetailsFetcher = async (
  filters: FormatedSearchableFilter
): Promise<GqlResponse<HealthCenter, "getHealthCenter">> => {
  const client = createGraphqlRequestClient();

  client.setQuery(
    `
    query getHealthCenter($id:String!){
    getHealthCenter(
        serviceId:$id
    ){
        cancelationPolicies {
            cost
            duration
        }
        contact{
            address
            city
            country
            email
            phone
            state
        }
        doctors{
            availablityStatus
            description
            healthCenterId
            id
            name
            price
            rating
            speciality{
                description
                id
                name
            }
            specialityId
            thumbnail
        }
        id
        location {
            address
            city
            country
            lat
            lon
            postalCode
            state
        }
        ownerId
        owner{
            id
            firstName
            lastName
            email
            photo
            verified
        }
        payment_methods
        policies {
            policyTitle
            terms
        }
        presentations {
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
        status
        totalReviews
        vat
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
    }   }
}
    `
  );

  return client.setVariables(filters).send();
};
