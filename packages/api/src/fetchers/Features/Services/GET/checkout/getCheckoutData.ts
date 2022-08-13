import { FormatedSearchableFilter } from "api";
import { AsyncReturnType } from "types";

import { randomNum } from "utils";
import {
  CheckValidation,
  InferType,
  ServiceCheckoutDataApiResponseValidationSchema,
  HotelCheckoutServiceDataValidationSchema,
  CashbackValidationSchema,
  RestaurantServiceCheckoutDataValidationSchema,
  HealthCenterServiceCheckoutDataValidationSchema,
  ServiceCheckoutCommonDataValidationSchema,
  BeautyCenterServiceCheckoutDataValidationSchema,
  ServiceCheckoutDataValidationTester,
} from "validation";
const senctence =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima libero perferendis fugit error unde, adipisci possimus totam mollitia? Inventore odio soluta nisi magnam vitae id voluptatum cum atque maiores nihil";

export type CashbackData = InferType<typeof CashbackValidationSchema>;

export type ServiceCheckoutDataType = InferType<
  typeof ServiceCheckoutDataValidationTester
>;

export type ServiceCheckoutApiResponse = InferType<
  typeof ServiceCheckoutDataApiResponseValidationSchema
>;

export type CommonServiceCheckoutData = InferType<
  typeof ServiceCheckoutCommonDataValidationSchema
>;

export type HotelCheckoutBookedPropertyData = InferType<
  typeof HotelCheckoutServiceDataValidationSchema
>;

export type RestaurantCheckoutBookedPropertyData = InferType<
  typeof RestaurantServiceCheckoutDataValidationSchema
>;

export type HealthCenterCheckoutBookedPropertyData = InferType<
  typeof HealthCenterServiceCheckoutDataValidationSchema
>;

export type BeautyCenterCheckoutBookedPropertyData = InferType<
  typeof BeautyCenterServiceCheckoutDataValidationSchema
>;

export const getServiceCheckoutDataFetcher = async (
  filters: FormatedSearchableFilter
): Promise<ServiceCheckoutApiResponse> => {
  const res: AsyncReturnType<typeof getServiceCheckoutDataFetcher> = {
    data: {
      bookedServices: [
        {
          type: "hotel",
          data: {
            serviceType: "hotel",
            bookedDates: {
              from: new Date(Date.now()).toString(),
              to: new Date(Date.now()).toString(),
            },
            rate: randomNum(5),
            refundingRule: {
              cost: 12,
              duration: 3,
              id: "12",
            },

            reviews: randomNum(153),
            thumbnail: "/place-1.jpg",
            id: "123",
            rateReason: "cleanliness",
            title: "Citadines Montmartre Paris",
            duration: [30, 60],
            extras: [
              {
                name: "Breakfast + book now, pay later",
                price: randomNum(100),
              },
            ],
            guests: randomNum(5),
            cashback: {
              amount: randomNum(20),
              type: "percent",
            },
            price: randomNum(500),
          },
        },
        {
          type: "resturant",
          data: {
            serviceType: "resturant",
            bookedDates: {
              from: new Date(Date.now()).toString(),
              to: null,
            },

            rate: randomNum(5),
            refundingRule: {
              cost: 0,
              duration: 0,
              id: "12",
            },
            reviews: randomNum(153),
            thumbnail:
              "https://digital.ihg.com/is/image/ihg/crowne-plaza-jeddah-5499645385-2x1",
            id: "123",
            rateReason: "cleanliness",
            title: "Citadines Montmartre Paris",
            duration: [30, 60],
            bookedMenus: [
              {
                price: randomNum(100),
                qty: randomNum(10),
                title: senctence.slice(0, randomNum(senctence.length)),
              },
              {
                price: randomNum(100),
                qty: randomNum(10),
                title: senctence.slice(0, randomNum(senctence.length)),
              },
              {
                price: randomNum(100),
                qty: randomNum(10),
                title: senctence.slice(0, randomNum(senctence.length)),
              },
            ],
            guests: randomNum(5),
            cashback: {
              amount: randomNum(20),
              type: "percent",
            },

            price: randomNum(500),
          },
        },
        {
          type: "health_center",
          data: {
            serviceType: "health_center",
            bookedDates: {
              from: new Date(Date.now()).toString(),
              to: new Date(Date.now()).toString(),
            },
            rate: randomNum(5),
            refundingRule: {
              cost: 60,
              duration: 0,
              id: "12",
            },

            reviews: randomNum(153),
            thumbnail:
              "https://www.astate.edu/a/student-health-center/images/student-health-750px.jpg",
            id: "123",
            rateReason: "cleanliness",
            title: "Citadines Montmartre Paris",

            duration: [30, 60],
            guests: randomNum(5),
            cashback: {
              amount: randomNum(20),
              type: "percent",
            },
            price: randomNum(500),
            doctor: {
              id: "123",
              name: "Doctor 1",
              specialty: "spine",
              price: randomNum(50),
              photo:
                "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
            },
          },
        },
        {
          type: "beauty_center",
          data: {
            serviceType: "beauty_center",
            bookedDates: {
              from: new Date(Date.now()).toString(),
              to: new Date(Date.now()).toString(),
            },
            rate: randomNum(5),
            refundingRule: {
              cost: 0,
              duration: 4,
              id: "12",
            },
            duration: [30, 60],
            reviews: randomNum(153),
            thumbnail:
              "https://www.ariostea-high-tech.com/img/progetti/hotel-spa-wellness/U714/big/Tacha+Beauty+Center-01.jpg",
            id: "123",
            rateReason: "cleanliness",
            title: "Citadines Montmartre Paris",
            cashback: {
              amount: randomNum(20),
              type: "percent",
            },
            guests: null,
            price: randomNum(500),
            bookedTreatments: [
              {
                id: "123",
                category: "Facial",
                title: "Hydro facial with chemical peel",
                durationInMinutes: [30, 60],
                price: randomNum(50),
                discount: randomNum(60),
              },
            ],
          },
        },
      ],
      saved: randomNum(150),
      vat: 7,
    },
  };
  return CheckValidation(ServiceCheckoutDataApiResponseValidationSchema, res);
};
