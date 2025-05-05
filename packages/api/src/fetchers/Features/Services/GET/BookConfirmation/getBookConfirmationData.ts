import { AsyncReturnType } from "types";
import {
  BookConfirmationApiResponseValidationSchema,
  CheckValidation,
  InferType,
} from "validation";
import { ServiceCheckoutDataType } from "../checkout";
import { HealthCenterDoctorAvailablityStatus } from "ui";

export type BookedServiceConfirmationApiResponse = InferType<
  typeof BookConfirmationApiResponseValidationSchema
>;

const senctence =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima libero perferendis fugit error unde, adipisci possimus totam mollitia? Inventore odio soluta nisi magnam vitae id voluptatum cum atque maiores nihil";

const bookedServices: ServiceCheckoutDataType[] = [
  {
    type: "hotel",
    data: {
      serviceType: "hotel",
      bookedDates: {
        from: new Date(Date.now()).toString(),
        to: new Date(Date.now()).toString(),
      },
      rate: 5,
      refundingRule: {
        cost: 12,
        duration: 3,
        id: "12",
      },

      reviews: 153,
      thumbnail: "/place-1.jpg",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",
      duration: [30, 60],
      extras: [
        {
          name: "Breakfast + book now, pay later",
          price: 100,
        },
      ],
      guests: 5,
      cashback: {
        amount: 20,
        type: "percent",
      },
      price: 500,
    },
  },
  {
    type: "restaurant",
    data: {
      serviceType: "restaurant",
      bookedDates: {
        from: new Date(Date.now()).toString(),
        to: new Date(Date.now()).toString(),
      },

      rate: 5,
      refundingRule: {
        cost: 0,
        duration: 0,
        id: "12",
      },
      reviews: 153,
      thumbnail:
        "https://digital.ihg.com/is/image/ihg/crowne-plaza-jeddah-5499645385-2x1",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",
      duration: [30, 60],
      bookedMenus: [
        {
          price: 100,
          qty: 10,
          title: senctence.slice(0, senctence.length),
        },
        {
          price: 100,
          qty: 10,
          title: senctence.slice(0, senctence.length),
        },
        {
          price: 100,
          qty: 10,
          title: senctence.slice(0, senctence.length),
        },
      ],
      guests: 5,
      cashback: {
        amount: 20,
        type: "percent",
      },

      price: 500,
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
      rate: 5,
      refundingRule: {
        cost: 60,
        duration: 0,
        id: "12",
      },

      reviews: 153,
      thumbnail:
        "https://www.astate.edu/a/student-health-center/images/student-health-750px.jpg",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",

      duration: [30, 60],
      guests: 5,
      cashback: {
        amount: 20,
        type: "percent",
      },
      price: 100,
      doctor: {
        id: "123",
        rating: 3,
        name: "Doctor 1",
        specialty: "spine",
        description: "doctor description",
        healthCenterId: "3",
        price: 50,
        availabilityStatus: "available",
        photo:
          "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
      },
    },
  },
  {
    type: "beauty_center",
    data: {
      guests: 5,
      serviceType: "beauty_center",
      bookedDates: {
        from: new Date(Date.now()).toString(),
        to: new Date(Date.now()).toString(),
      },
      rate: 5,
      refundingRule: {
        cost: 0,
        duration: 4,
        id: "12",
      },
      duration: [30, 60],
      reviews: 153,
      thumbnail:
        "https://www.ariostea-high-tech.com/img/progetti/hotel-spa-wellness/U714/big/Tacha+Beauty+Center-01.jpg",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",
      cashback: {
        amount: 20,
        type: "percent",
      },
      price: 500,
      bookedTreatments: [
        {
          id: "44",
          category: "Facial",
          title: "Hydro facial with chemical peel",
          durationInMinutes: [30, 60],
          price: 50,
          discount: 60,
        },
      ],
    },
  },
];

export const getBookedSerivceConfirmationDataFetcher = async (
  id: string
): Promise<BookedServiceConfirmationApiResponse> => {
  const res: AsyncReturnType<typeof getBookedSerivceConfirmationDataFetcher> = {
    data: {
      propertyData: bookedServices[3],
      bookedId: "HJG@%$!25",
      reactOut: {
        email: "Example@email.com",
        location: {
          address: "Rue du marche 34",
          city: "Geneve",
          country: "switzerland",
          lat: 45.464664,
          lon: 9.18854,
          countryCode: "USA",
          state: "state",
          postalCode: 1204,
        },
        telephone: "101227879123",
      },
      workingDays: {
        workingHours: {
          id: "1",
          weekdays: {
            mo: {
              periods: ["2023-06-09T09:00:00.000Z", "2023-06-09T19:30:00.000Z"],
            },
            tu: {
              periods: ["2023-06-10T09:00:00.000Z", "2023-06-10T19:30:00.000Z"],
            },
            we: {
              periods: ["2023-06-11T09:00:00.000Z", "2023-06-11T19:30:00.000Z"],
            },
            th: {
              periods: ["2023-06-12T09:00:00.000Z", "2023-06-12T19:30:00.000Z"],
            },
            fr: {
              periods: ["2023-06-13T00:00:00.000Z", "2023-06-13T00:00:00.000Z"],
            },
            sa: {
              periods: ["2023-06-14T09:00:00.000Z", "2023-06-14T19:30:00.000Z"],
            },
            su: {
              periods: ["2023-06-15T09:00:00.000Z", "2023-06-15T19:30:00.000Z"],
            },
          },
        },
      },
    },
  };
  return res;
};
