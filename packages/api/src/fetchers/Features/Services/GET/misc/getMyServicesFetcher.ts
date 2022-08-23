import { QueryPaginationInputs } from "src/types";
import { AsyncReturnType } from "types";
import {
  InferType,
  MyServiceValidationSchema,
  MyServicesApiResponseValidationSchema,
  CheckValidation,
} from "validation";

export type MyServiceData = InferType<typeof MyServiceValidationSchema>;

export const getMyServicesFetcher = async (
  pagination: QueryPaginationInputs
): Promise<InferType<typeof MyServicesApiResponseValidationSchema>> => {
  const res: AsyncReturnType<typeof getMyServicesFetcher> = {
    hasMore: false,
    total: 150,
    data: [
      {
        id: "1354",
        status: "active",
        title: "hotel service title",
        type: "hotel",
        thumbnail: "/shop-2.jpeg",
      },
      {
        id: "1354",
        status: "inActive",
        title: "resaturant service title",
        type: "resturant",
        thumbnail: "/shop-3.jpeg",
      },
      {
        id: "1354",
        status: "banned",
        title: "hotel service title",
        type: "vehicle",
        thumbnail: "/place-1.jpg",
      },
      {
        id: "1354",
        status: "pending",
        title: "hotel service title",
        type: "health_center",
        thumbnail: "/place-2.jpg",
      },
      {
        id: "1354",
        status: "active",
        title: "hotel service title",
        type: "beauty_center",
        thumbnail: "/place-3.jpg",
      },
      {
        id: "1354",
        status: "active",
        title: "hotel service title",
        type: "holidays_rentals",
        thumbnail: "/shop.jpeg",
      },
    ],
  };

  return CheckValidation(MyServicesApiResponseValidationSchema, res);
};
