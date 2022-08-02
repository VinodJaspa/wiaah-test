import { FormatedSearchableFilter } from "api";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
  InferType,
  ServiceCheckoutDataApiResponseValidationSchema,
  CheckoutServiceDataValidationSchema,
} from "validation";

export type ServiceCheckoutApiResponse = InferType<
  typeof ServiceCheckoutDataApiResponseValidationSchema
>;

export type ServiceCheckoutBookedPropertyData = InferType<
  typeof CheckoutServiceDataValidationSchema
>;

export const getServiceCheckoutDataFetcher = async (
  filters: FormatedSearchableFilter
): Promise<ServiceCheckoutApiResponse> => {
  const res: AsyncReturnType<typeof getServiceCheckoutDataFetcher> = {
    data: {
      bookedServices: [...Array(2)].map(() => ({
        bookedDates: {
          checkin: new Date(Date.now()).toString(),
          checkout: new Date(Date.now()).toString(),
        },
        rate: randomNum(5),
        refundingRule: {
          cost: 0,
          duration: 0,
          id: "12",
        },
        reviews: randomNum(153),
        thumbnail: "/place-1.jpg",
        id: "123",
        rateReason: "cleanliness",
        title: "Citadines Montmartre Paris",
        extras: ["Breakfast + book now, pay later"],
      })),
    },
  };
  return CheckValidation(ServiceCheckoutDataApiResponseValidationSchema, res);
};
