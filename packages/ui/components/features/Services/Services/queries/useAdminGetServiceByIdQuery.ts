import {
  BeautyCenterTreatment,
  BeautyCenterTreatmentCategory,
  HealthCenterDoctor,
  HotelRoom,
  RestaurantDish,
  RestaurantMenu,
  ServiceAmenity,
  ServiceCancelationPolicy,
  ServiceContact,
  ServiceDailyPrices,
  ServiceDayWorkingHours,
  ServiceExtra,
  ServiceLocation,
  ServiceMetaInfo,
  ServicePolicy,
  ServicePropertyMeasurements,
  Vehicle,
  VehicleProperties,
  WorkingSchedule,
  ServiceDiscount,
  ServicePresentation,
} from "@features/Services/Services";
import { Exact, Maybe, Scalars } from "types";
import {
  ServiceMetaInfoTranslation,
  ServiceShopRaw,
  ServiceTranslationPolicy,
} from "@features/Services/Services";
import { createGraphqlRequestClient } from "api";

export const useAdminGetServiceByIdQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`

    `);
};

export type GetRawServiceQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetRawServiceQuery = { __typename?: "Query" } & {
  adminGetRawService?: Maybe<
    { __typename?: "ServiceShopRaw" } & Pick<
      ServiceShopRaw,
      | "id"
      | "createdAt"
      | "cuisinesTypeId"
      | "establishmentTypeId"
      | "highest_price"
      | "lowest_price"
      | "michelin_guide_stars"
      | "ownerId"
      | "payment_methods"
      | "rating"
      | "reviews"
      | "setting_and_ambianceId"
      | "status"
      | "suspensionReason"
      | "type"
      | "type_of_seller"
      | "updatedAt"
      | "vat"
    > & {
        cancelationPolicies: Array<
          { __typename?: "ServiceCancelationPolicy" } & Pick<
            ServiceCancelationPolicy,
            "cost" | "duration"
          >
        >;
        contact: { __typename?: "ServiceContact" } & Pick<
          ServiceContact,
          "address" | "city" | "country" | "email" | "phone" | "state"
        >;
        doctors?: Maybe<
          Array<
            { __typename?: "HealthCenterDoctor" } & Pick<
              HealthCenterDoctor,
              | "availablityStatus"
              | "description"
              | "healthCenterId"
              | "id"
              | "name"
              | "price"
              | "rating"
              | "specialityId"
              | "thumbnail"
            >
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
                  { __typename?: "RestaurantDish" } & Pick<
                    RestaurantDish,
                    "id" | "ingredients" | "name" | "price" | "thumbnail"
                  >
                >;
              }
          >
        >;
        policies: Array<
          { __typename?: "ServiceTranslationPolicy" } & Pick<
            ServiceTranslationPolicy,
            "langId"
          > & {
              value: Array<
                { __typename?: "ServicePolicy" } & Pick<
                  ServicePolicy,
                  "policyTitle" | "terms"
                >
              >;
            }
        >;
        presentations: Array<
          { __typename?: "ServicePresentation" } & Pick<
            ServicePresentation,
            "type" | "src"
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
              | "reviews"
              | "sellerId"
              | "title"
              | "updatedAt"
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
                measurements: {
                  __typename?: "ServicePropertyMeasurements";
                } & Pick<ServicePropertyMeasurements, "inFeet" | "inMeter">;
                popularAmenities?: Maybe<
                  Array<
                    { __typename?: "ServiceAmenity" } & Pick<
                      ServiceAmenity,
                      "label" | "value"
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
        serviceMetaInfo: Array<
          { __typename?: "ServiceMetaInfoTranslation" } & Pick<
            ServiceMetaInfoTranslation,
            "langId"
          > & {
              value: { __typename?: "ServiceMetaInfo" } & Pick<
                ServiceMetaInfo,
                | "description"
                | "hashtags"
                | "metaTagDescription"
                | "metaTagKeywords"
                | "title"
              >;
            }
        >;
        treatments?: Maybe<
          Array<
            { __typename?: "BeautyCenterTreatment" } & Pick<
              BeautyCenterTreatment,
              "duration" | "id" | "price" | "title" | "treatmentCategoryId"
            > & {
                category?: Maybe<
                  { __typename?: "BeautyCenterTreatmentCategory" } & Pick<
                    BeautyCenterTreatmentCategory,
                    "createdAt" | "createdById" | "id" | "title" | "updatedAt"
                  >
                >;
                discount: { __typename?: "ServiceDiscount" } & Pick<
                  ServiceDiscount,
                  "units" | "value"
                >;
              }
          >
        >;
        vehicle?: Maybe<
          Array<
            { __typename?: "Vehicle" } & Pick<
              Vehicle,
              "brand" | "model" | "id" | "price" | "title"
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
      }
  >;
};
