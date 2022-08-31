import { AsyncReturnType } from "types";
import {
  CheckValidation,
  InferType,
  OrderDetailsValidationSchema,
  OrderDetailsApiResponseValidationSchema,
} from "validation";

export type OrderDataType = InferType<typeof OrderDetailsValidationSchema>;

export const getOrderDetailsFetcher = (): Promise<
  InferType<typeof OrderDetailsApiResponseValidationSchema>
> => {
  const res: AsyncReturnType<typeof getOrderDetailsFetcher> = {
    data: {
      orderId: "123465",
      orderedDate: new Date().toString(),
      deliveryDate: new Date().toString(),
      deliveryAddress: {
        address: "address",
        city: "city",
        cords: {
          lat: 15,
          lng: 61,
        },
        country: "country",
        countryCode: "CHF",
        postalCode: 1332,
        state: "state",
      },
      products: [
        {
          name: "Product name 1",
          price: 159,
          props: ["tag 1", "tag 2", "tag 3"],
          qty: 2,
          thumbnail: "/shop-2.jpeg",
        },
        {
          name: "Product name 1",
          price: 159,
          props: ["tag 1", "tag 2", "tag 3"],
          qty: 2,
          thumbnail: "/shop-2.jpeg",
        },
        {
          name: "Product name 1",
          price: 159,
          props: ["tag 1", "tag 2", "tag 3"],
          qty: 2,
          thumbnail: "/shop-2.jpeg",
        },
      ],
      phoneNumber: "456-165-1345",
      deliveryCost: 16,
      discount: 10,
      tax: 30,
    },
  };

  return CheckValidation(OrderDetailsApiResponseValidationSchema, res);
};
