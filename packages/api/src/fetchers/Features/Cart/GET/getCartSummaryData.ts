import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  CartSummaryItemDataValidationSchema,
  CheckValidation,
  InferType,
  MyCartSummaryApiResponseValidationSchema,
} from "validation";

export type CartSummaryItemData = InferType<
  typeof CartSummaryItemDataValidationSchema
>;
const senctence =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima libero perferendis fugit error unde, adipisci possimus totam mollitia? Inventore odio soluta nisi magnam vitae id voluptatum cum atque maiores nihil";

export const getMyCartSummaryDataFetcher = (): Promise<
  InferType<typeof MyCartSummaryApiResponseValidationSchema>
> => {
  const res: AsyncReturnType<typeof getMyCartSummaryDataFetcher> = {
    total: 513,
    hasMore: false,
    data: [
      {
        providerData: {
          id: "1",
          name: "wiaah",
          thumbnail: "/shop-2.jpeg",
          type: "shop",
        },
        itemData: {
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
      },
      {
        providerData: {
          id: "1",
          name: "wiaah",
          thumbnail: "/shop-2.jpeg",
          type: "shop",
        },
        itemData: {
          type: "resturant",
          data: {
            serviceType: "restaurant",
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
      },
      {
        providerData: {
          id: "1",
          name: "wiaah",
          thumbnail: "/shop-2.jpeg",
          type: "shop",
        },
        itemData: {
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
      },
      {
        providerData: {
          id: "1",
          name: "wiaah",
          thumbnail: "/shop-2.jpeg",
          type: "shop",
        },
        itemData: {
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
      },
      {
        providerData: {
          id: "1",
          name: "wiaah",
          thumbnail: "/shop-2.jpeg",
          type: "shop",
        },
        itemData: {
          type: "product",
          data: {
            location: {
              address: "address",
              city: "city",
              cords: {
                lat: 15,
                lng: 16,
              },
              country: "country",
              countryCode: "CH",
              postalCode: 13254,
              state: "state",
            },
            id: "2",
            thumbnail:
              "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
            name: "item1",
            type: "goods",
            price: 15,
            qty: 3,
            shippingMethods: [
              {
                cost: 15,
                description: "test",
                id: "12",
                deliveryTime: {
                  from: 5,
                  to: 7,
                },
                name: "European union",
                value: "european_union",
              },
              {
                cost: 0,
                description: "test",
                id: "12",
                deliveryTime: {
                  from: 1,
                  to: 3,
                },
                name: "Click & Collect",
                value: "click_and_collect",
              },
              {
                cost: 20,
                description: "test",
                id: "12",
                deliveryTime: {
                  from: 6,
                  to: 8,
                },
                name: "International",
                value: "international",
              },
            ],
            color: "red",
            size: "One Size",
            cashback: {
              amount: 4,
              type: "cash",
            },
            discount: 10,
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloremque molestiae perferendis saepe? Tenetur, eligendi. Excepturi voluptate harum fuga! Consequatur?`,
          },
        },
      },
    ],
  };
  return CheckValidation(MyCartSummaryApiResponseValidationSchema, res);
};
