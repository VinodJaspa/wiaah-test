import { FormatedSearchableFilter } from "src";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  InferType,
  CheckValidation,
  ResturantServiceApiDataResponseValidationSchema,
  ResturantMenuListValidationSchema,
  ResturantServiceDetailsValidationSchema,
} from "validation";

export type ResturantMenuListType = InferType<
  typeof ResturantMenuListValidationSchema
>;

export type ResturantMenuData = Pick<
  InferType<typeof ResturantServiceDetailsValidationSchema>,
  "menus"
>;

export type ResturantDetailsApiResponse = InferType<
  typeof ResturantServiceApiDataResponseValidationSchema
>;

export type getResturantServiceApiResponseFetcher = AsyncReturnType<
  typeof getResturantServiceDetialsData
>;

export const getResturantServiceDetialsData = async (
  filters: FormatedSearchableFilter
): Promise<ResturantDetailsApiResponse> => {
  const data: getResturantServiceApiResponseFetcher = {
    data: {
      vatPercent: 7,
      id: "testid",
      name: "ibis Paris Maine Montparnasse 14th",
      rating: 4.1,
      reviewsCount: 1115,
      thumbnail: "/shop-2.jpeg",
      proprtyType: "Resturant",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",

      presintations: [
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
      tablePrice: 60,
      serviceFee: 15,
      email: "Example@email.com",
      location: {
        address: "Rue du marche 34",
        city: "Geneve",
        country: "switzerland",
        cords: {
          lat: 45.464664,
          lng: 9.18854,
        },
        postalCode: 1204,
        countryCode: "USA",
        state: "state",
      },
      telephone: "101227879123",
      workingDays: [
        {
          weekDay: "Friday",

          from: new Date(2022, 8, 11, 15).toString(),
          to: new Date(2022, 8, 11, 19).toString(),
        },
        {
          weekDay: "Monday",
          from: new Date(2022, 8, 11, 15).toString(),
          to: new Date(2022, 8, 11, 19).toString(),
        },
        {
          weekDay: "Saturday",
          from: new Date(2022, 8, 11, 15).toString(),
          to: new Date(2022, 8, 11, 19).toString(),
        },
        {
          weekDay: "Sunday",
          from: new Date(2022, 8, 11, 15).toString(),
          to: new Date(2022, 8, 11, 19).toString(),
        },
        {
          weekDay: "Thursday",
          from: new Date(2022, 8, 11, 15).toString(),
          to: new Date(2022, 8, 11, 19).toString(),
        },
        {
          weekDay: "Tuesday",
          from: new Date(2022, 8, 11, 15).toString(),
          to: new Date(2022, 8, 11, 19).toString(),
        },
        {
          weekDay: "Wednesday",
          from: new Date(2022, 8, 11, 15).toString(),
          to: new Date(2022, 8, 11, 19).toString(),
        },
      ],
      deposit: randomNum(50),
      policies: [
        {
          policyTerms: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting",
            "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
            "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
            "Ipsum passages, and more recently with desktop publishing",
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of",
            "packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
          ],
          policyTitle: "Reservation terms",
        },
      ],
      cancelationPolicies: [
        {
          duration: 6,
          cost: 0,
          id: "1",
        },
        {
          duration: 10,
          cost: 10,
          id: "2",
        },
        {
          cost: 50,
          duration: 0,
          id: "3",
        },
      ],
      menus: [
        {
          listTitle: "Starter",
          menuItems: [
            {
              id: `${randomNum(1553534321)}`,
              price: randomNum(50),
              title:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ",
            },
            {
              id: `${randomNum(1553534321)}`,
              price: randomNum(50),
              title:
                "survived not only five centuries, but also the leap into electronic",
            },
            {
              id: `${randomNum(1553534321)}`,
              price: randomNum(50),
              title:
                "readable content of a page when looking at its layout. The point of using Lorem",
            },
            {
              id: `${randomNum(1553534321)}`,
              price: randomNum(50),
              title:
                "many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose",
            },
            {
              id: `${randomNum(1553534321)}`,
              price: randomNum(50),
              title: "Lorem Ipsum is simply dummy text of",
            },
          ],
        },
        {
          listTitle: "Main Course",
          menuItems: [
            {
              id: `${randomNum(1553534321)}`,
              price: randomNum(50),
              title:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ",
            },
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title:
                "survived not only five centuries, but also the leap into electronic",
            },
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title:
                "readable content of a page when looking at its layout. The point of using Lorem",
            },
            {
              id: `${randomNum(1553534321)}`,
              price: randomNum(50),
              title:
                "many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose",
            },
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title: "Lorem Ipsum is simply dummy text of",
            },
          ],
        },
        {
          listTitle: "Dessert",
          menuItems: [
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ",
            },
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title:
                "survived not only five centuries, but also the leap into electronic",
            },
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title:
                "readable content of a page when looking at its layout. The point of using Lorem",
            },
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title:
                "many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose",
            },
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title: "Lorem Ipsum is simply dummy text of",
            },
          ],
        },
        {
          listTitle: "Drinks",
          menuItems: [
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ",
            },
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title:
                "survived not only five centuries, but also the leap into electronic",
            },
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title:
                "readable content of a page when looking at its layout. The point of using Lorem",
            },
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title:
                "many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose",
            },
            {
              price: randomNum(50),
              id: `${randomNum(1553534321)}`,
              title: "Lorem Ipsum is simply dummy text of",
            },
          ],
        },
      ],
    },
  };

  return CheckValidation(ResturantServiceApiDataResponseValidationSchema, data);
};
