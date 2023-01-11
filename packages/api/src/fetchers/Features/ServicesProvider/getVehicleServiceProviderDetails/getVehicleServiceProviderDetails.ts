import {
  createGraphqlRequestClient,
  FormatedSearchableFilter,
  ServiceOwnerAccount,
} from "src";
import { AsyncReturnType, GqlResponse } from "types";
import {
  CheckValidation,
  InferType,
  vehicleServiceProviderDetailsApiResponseValidationSchema,
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

export type VehicleProperties = {
  __typename?: "VehicleProperties";
  seats: Scalars["Int"];
  windows: Scalars["Int"];
  maxSpeedInKm: Scalars["Int"];
  lugaggeCapacity: Scalars["Int"];
  gpsAvailable: Scalars["Boolean"];
  airCondition: Scalars["Boolean"];
};

export type Vehicle = {
  __typename?: "Vehicle";
  id: Scalars["ID"];
  title: Scalars["String"];
  presentations: Array<ServicePresentation>;
  brand: Scalars["String"];
  model: Scalars["String"];
  price: Scalars["Int"];
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  properties: VehicleProperties;
};

export type VehicleService = {
  __typename?: "VehicleService";
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  owner: ServiceOwnerAccount;
  workingHours: WorkingSchedule;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  vat: Scalars["Float"];
  rating: Scalars["Float"];
  totalReviews: Scalars["Int"];
  contact: ServiceContact;
  location: ServiceLocation;
  presentations: Array<ServicePresentation>;
  policies: Array<ServicePolicy>;
  serviceMetaInfo: ServiceMetaInfo;
  payment_methods: Array<ServicePaymentMethods>;
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  vehicles: Array<Vehicle>;
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

export const getVehicleServiceProviderDetailsFetcher = async (
  filters: FormatedSearchableFilter
): Promise<VehicleService> => {
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

  const res = await client.send<
    GqlResponse<VehicleService, "getVehicleServicebyId">
  >();

  return res.data.data.getVehicleServicebyId;
};
