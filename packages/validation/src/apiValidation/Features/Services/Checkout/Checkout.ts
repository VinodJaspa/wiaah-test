import { createApiResponseValidationSchema } from "../../../SharedSchema";
import { CashbackValidationSchema } from "../../Products";
import { array, InferType, mixed, number, object, string } from "yup";
import { ServiceCancelationPolicy } from "../common";
import { ServicesType } from "types";
import { HealthCenterDoctorMetaDataValidationSchema } from "../../ServicesProvider/HealthCenterDetailsData.schema";
import { beautyCenterTreatmentValidationSchema } from "../BeautyCenter";

const services: ServicesType[] = [
  "beauty_center",
  "general",
  "health_center",
  "holidays_rentals",
  "hotel",
  "resturant",
  "vehicle",
];

type ServicesCheckoutData =
  | {
      type: "hotel";
      data: InferType<typeof HotelCheckoutServiceDataValidationSchema>;
    }
  | {
      type: "resturant";
      data: InferType<typeof RestaurantServiceCheckoutDataValidationSchema>;
    }
  | {
      type: "health_center";
      data: InferType<typeof HealthCenterServiceCheckoutDataValidationSchema>;
    }
  | {
      type: "beauty_center";
      data: InferType<typeof BeautyCenterServiceCheckoutDataValidationSchema>;
    };

export const ServiceCheckoutCommonDataValidationSchema = object({
  serviceType: mixed<ServicesType>().oneOf(services),
  id: string().required(),
  title: string().required(),
  thumbnail: string().required(),
  rate: number().min(0).max(5).required(),
  reviews: number().required(),
  refundingRule: ServiceCancelationPolicy,
  rateReason: string().required(),
  bookedDates: object({
    from: string().required(),
    to: string().nullable(),
  }),
  cashback: CashbackValidationSchema.required(),
  price: number().required(),
  duration: array().of(number().required()).min(1).max(2).optional(),
  guests: number().nullable(),
});

export const HotelCheckoutServiceDataValidationSchema =
  ServiceCheckoutCommonDataValidationSchema.concat(
    object({
      extras: array()
        .of(
          object({
            name: string().required(),
            price: number().required(),
          })
        )
        .min(0)
        .required(),
      guests: number().required(),
    })
  );

export const RestaurantServiceCheckoutDataValidationSchema =
  ServiceCheckoutCommonDataValidationSchema.concat(
    object({
      bookedMenus: array()
        .of(
          object({
            title: string().required(),
            qty: number().required(),
            price: number().required(),
          }).required()
        )
        .min(0)
        .required(),
      guests: number().required(),
    })
  );

export const HealthCenterServiceCheckoutDataValidationSchema =
  ServiceCheckoutCommonDataValidationSchema.concat(
    object({
      doctor: HealthCenterDoctorMetaDataValidationSchema.required(),
      guests: number().required(),
    })
  );

export const BeautyCenterServiceCheckoutDataValidationSchema =
  ServiceCheckoutCommonDataValidationSchema.concat(
    object({
      bookedTreatments: array()
        .of(beautyCenterTreatmentValidationSchema)
        .min(0)
        .required(),
    })
  );

export const ServiceCheckoutDataValidationTester =
  mixed<ServicesCheckoutData>().test(
    "ServiceCheckoutData",
    "service type and data doesnt match",
    (value) => {
      console.log("value", value);
      if (!value) return false;
      try {
        switch (value.type) {
          case "hotel":
            HotelCheckoutServiceDataValidationSchema.validateSync(value.data);
            break;
          case "resturant":
            RestaurantServiceCheckoutDataValidationSchema.validateSync(
              value.data
            );
            break;
          case "health_center":
            HealthCenterServiceCheckoutDataValidationSchema.validateSync(
              value.data
            );
            break;
          case "beauty_center":
            BeautyCenterServiceCheckoutDataValidationSchema.validateSync(
              value.data
            );
            break;
          default:
            return false;
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  );

export const ServiceCheckoutDataApiResponseValidationSchema =
  createApiResponseValidationSchema(
    object({
      bookedServices: array()
        .of(ServiceCheckoutDataValidationTester)
        .min(0)
        .required(),
      vat: number().required(),
      saved: number().required(),
    })
  );
