import { FormatedSearchableFilter } from "src";
import { AsyncReturnType } from "types";
import {
  InferType,
  CheckValidation,
  ServicesProviderDataValidationSchema,
  ServicesProviderApiResponseValidationSchema,
  PaginationConstants,
} from "validation";

export type ServicesProviderData = InferType<
  typeof ServicesProviderDataValidationSchema
>;

export type ServicesProviderHeaderData = Pick<
  ServicesProviderData,
  "name" | "rating" | "reviewsCount" | "thumbnail"
>;

export type ServicesProviderLocationWorkData = Pick<
  ServicesProviderData,
  "location" | "workingDays" | "telephone"
>;

export type ServicesProviderApiResponse = InferType<
  typeof ServicesProviderApiResponseValidationSchema
>;

export type getServicesProviderDataFetcherResponse = AsyncReturnType<
  typeof getServicesProviderDataFetcher
>;

export const getServicesProviderDataFetcher = async (
  filters: FormatedSearchableFilter
): Promise<ServicesProviderApiResponse> => {
  const data: getServicesProviderDataFetcherResponse = {
    data: {
      name: "ibis Paris Maine Montparnasse 14th",
      rating: 4.1,
      reviewsCount: 1115,
      thumbnail: "/shop-2.jpeg",
      proprtyType: "Appartement",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",

      heroImages: [
        {
          src: "https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg",
          thumbnail:
            "https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg",
          type: "image",
        },
        {
          src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
          thumbnail:
            "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
          type: "image",
        },
        {
          src: "https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?w=2000",
          thumbnail:
            "https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?w=2000",
          type: "image",
        },
        {
          src: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
          type: "image",
        },
        {
          src: "https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg",
          thumbnail:
            "https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg",
          type: "image",
        },
        {
          src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
          thumbnail:
            "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
          type: "image",
        },
        {
          src: "https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?w=2000",
          thumbnail:
            "https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?w=2000",
          type: "image",
        },
        {
          src: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
          type: "image",
        },
      ],
      location: {
        address: "Rue du marche 34",
        city: "Geneve",
        county: "switzerland",
        cords: {
          lat: 45.464664,
          lng: 9.18854,
        },
        postalCode: 1204,
      },
      telephone: "101227879123",
      workingDays: [
        {
          weekDay: "Friday",
          from: {
            hour: 0,
            minutes: 0,
          },
          to: {
            hour: 0,
            minutes: 0,
          },
        },
        {
          weekDay: "Monday",
          from: {
            hour: 9,
            minutes: 0,
          },
          to: {
            hour: 19,
            minutes: 30,
          },
        },
        {
          weekDay: "Saturday",
          from: {
            hour: 9,
            minutes: 0,
          },
          to: {
            hour: 19,
            minutes: 30,
          },
        },
        {
          weekDay: "Sunday",
          from: {
            hour: 9,
            minutes: 0,
          },
          to: {
            hour: 19,
            minutes: 30,
          },
        },
        {
          weekDay: "Thursday",
          from: {
            hour: 9,
            minutes: 0,
          },
          to: {
            hour: 19,
            minutes: 30,
          },
        },
        {
          weekDay: "Tuesday",
          from: {
            hour: 9,
            minutes: 0,
          },
          to: {
            hour: 19,
            minutes: 30,
          },
        },
        {
          weekDay: "Wednesday",
          from: {
            hour: 9,
            minutes: 0,
          },
          to: {
            hour: 19,
            minutes: 30,
          },
        },
      ],
      pricePerNight: 721,
      serviceFee: 850,
      taxes: 10,
    },
  };

  return CheckValidation(ServicesProviderApiResponseValidationSchema, data);
};
