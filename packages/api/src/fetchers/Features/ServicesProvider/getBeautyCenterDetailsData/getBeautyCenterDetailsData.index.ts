import { createGraphqlRequestClient } from "@Utils";
import { FormatedSearchableFilter } from "src/types";
import { AsyncReturnType, GqlResponse } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
  InferType,
  BeautyCenterDetailsApiResponseValidationSchema,
  beautyCenterTreatmentValidationSchema,
  BeautyCenterDetailsValidationSchema,
} from "validation";
import {
  ServiceOwnerAccount,
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

type ServiceDiscount = {
  __typename?: "ServiceDiscount";
  value: Scalars["Int"];
  units: Scalars["Int"];
};

enum ServiceTypeOfSeller {
  Individual = "individual",
  Professional = "professional",
}

export type BeautyCenterTreatmentCategory = {
  __typename?: "BeautyCenterTreatmentCategory";
  id: Scalars["ID"];
  createdById: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  title: Scalars["String"];
};

export type BeautyCenterTreatment = {
  __typename?: "BeautyCenterTreatment";
  id: Scalars["ID"];
  treatmentCategoryId: Scalars["ID"];
  category?: Maybe<BeautyCenterTreatmentCategory>;
  title: Scalars["String"];
  price: Scalars["Float"];
  duration: Array<Scalars["Int"]>;
  discount: ServiceDiscount;
};

export type BeautyCenter = {
  __typename?: "BeautyCenter";
  id: Scalars["ID"];
  contact: ServiceContact;
  ownerId: Scalars["ID"];
  owner?: Maybe<ServiceOwnerAccount>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  vat: Scalars["Float"];
  rating: Scalars["Float"];
  totalReviews: Scalars["Int"];
  beauty_center_typeId: Scalars["ID"];
  status: ServiceStatus;
  title: Scalars["String"];
  location: ServiceLocation;
  presentations: Array<ServicePresentation>;
  policies: Array<ServicePolicy>;
  serviceMetaInfo: ServiceMetaInfo;
  payment_methods: Array<ServicePaymentMethods>;
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  type_of_seller: ServiceTypeOfSeller;
  treatments: Array<BeautyCenterTreatment>;
  workingHours?: Maybe<WorkingSchedule>;
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

export const getBeautyCenterDetailsDataFetcher = (
  id: string
): Promise<GqlResponse<BeautyCenter, "getBeautyCenterById">> => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getBeauty(
    $id: String!
){
    getBeautyCenterById(
        id:$id
    ){
        beauty_center_typeId
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
        owner{
            firstName
            lastName
            email
            photo
            verified
        }
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
        rating
        serviceMetaInfo {
            description
            hashtags
            metaTagDescription
            metaTagKeywords
            title
        }
        status
        title
        totalReviews
        treatments {
            category {
                createdAt
                createdById
                id
                title
                updatedAt
            }
            discount{
                units
                value
            }
            duration
            id
            price
            title
            treatmentCategoryId
        }
        type_of_seller
        updatedAt
        vat
        contact{
            address
            city
            country
            email
            phone
            state
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

  return client.setVariables({ id }).send();
};
