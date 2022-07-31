import { FormatedSearchableFilter } from "src";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  InferType,
  CheckValidation,
  HotelServiceDetailsValidationSchema,
  HotelServiceDetailsApiResponseValidationSchema,
  PopularAmenitiesValidationSchema,
  HotelServiceProviderRoomValidationSchema,
  PresntationMediaValidationSchema,
  ServicePoliciesValidationSchema,
  ServiceCancelationPolicy,
} from "validation";

export type ServiceCancelationPolicyType = InferType<
  typeof ServiceCancelationPolicy
>;

export type AmenitieType = InferType<typeof PopularAmenitiesValidationSchema>;

export type ServicesProviderData = InferType<
  typeof HotelServiceDetailsValidationSchema
>;

export type PresntationMediaType = InferType<
  typeof PresntationMediaValidationSchema
>;

export type ServicesProviderHeaderData = Pick<
  ServicesProviderData,
  "name" | "rating" | "reviewsCount" | "thumbnail" | "travelPeriod"
>;

export type ServiceWorkingDays = Pick<ServicesProviderData, "workingDays">;

export type ServiceReachOutType = Pick<
  ServicesProviderData,
  "email" | "telephone" | "location"
>;

export type ServiceLocation = Pick<ServicesProviderData, "location">;

export type ServicePoliciesType = InferType<
  typeof ServicePoliciesValidationSchema
>;

export type HotelRoomsType = Pick<ServicesProviderData, "rooms">;

export type HotelRoomDataType = InferType<
  typeof HotelServiceProviderRoomValidationSchema
>;

export type ServicesProviderApiResponse = InferType<
  typeof HotelServiceDetailsApiResponseValidationSchema
>;

export type getServicesProviderDataFetcherResponse = AsyncReturnType<
  typeof getServicesProviderDataFetcher
>;

export const getServicesProviderDataFetcher = async (
  filters: FormatedSearchableFilter
): Promise<ServicesProviderApiResponse> => {
  const data: getServicesProviderDataFetcherResponse = {
    data: {
      id: "testid",
      name: "ibis Paris Maine Montparnasse 14th",
      rating: 4.1,
      reviewsCount: 1115,
      thumbnail: "/shop-2.jpeg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",
      proprtyType: "hotel",
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
      email: "Example@email.com",
      location: {
        address: "Rue du marche 34",
        city: "Geneve",
        country: "switzerland",
        cords: {
          lat: 45.464664,
          lng: 9.18854,
        },
        countryCode: "USA",
        state: "state",
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
      PopularAmenities: [
        {
          name: "Pool",
          slug: "pool",
        },
        {
          name: "Pet-friendly",
          slug: "pet-friendly",
        },
        {
          name: "Resturant",
          slug: "resturant",
        },
        {
          name: "Breakfast available",
          slug: "breakfast",
        },
        {
          name: "Parking available",
          slug: "parking",
        },
        {
          name: "Laundry",
          slug: "laundry",
        },
        {
          name: "Housekeeping",
          slug: "housekeeping",
        },
        {
          name: "Free Wifi",
          slug: "free_wifi",
        },
        {
          name: "Air conditioning",
          slug: "a/c",
        },
        {
          name: "Gym",
          slug: "gym",
        },
        {
          name: "Business services",
          slug: "business_services",
        },
        {
          name: "Bar",
          slug: "bar",
        },
        {
          name: "Room service",
          slug: "room_service",
        },
        {
          name: "24/7 front desk",
          slug: "24/7_front_desk",
        },
      ],
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
          policyTitle: "checkin - checkout terms",
        },
      ],
      travelPeriod: {
        departure: new Date(Date.now()).toUTCString(),
        arrival: new Date(Date.now()).toUTCString(),
      },
      vat: randomNum(10),
      rooms: [...Array(9)].map((_, i) => ({
        includes: ["breakfast", "park"],
        discount: {
          amount: randomNum(50),
          units: randomNum(10),
        },
        size: {
          inFeet: 30,
          inMeter: 13,
        },
        id: `${i}`,
        title: "Executive Double Room, 1 double bed",
        thumbnails: ["/place-2.jpg", "/place-1.jpg"],
        extras: [
          "Free toiletries",
          "Shower",
          "Toilet",
          "Towels",
          "Private entrance",
          "Hairdryer",
          "Wardrobe or closet",
          "Upper floors accessible by elevator",
          "Toilet paper",
          "Free toiletries",
          "Shower",
          "Toilet",
          "Towels",
          "Private entrance",
          "Hairdryer",
          "Wardrobe or closet",
          "Upper floors accessible by elevator",
          "Toilet paper",
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
          {
            id: "4",
            cost: 0,
            duration: 0,
          },
        ],
        amenities: [
          {
            name: "Laundry",
            slug: "laundry",
          },
          {
            name: "Housekeeping",
            slug: "housekeeping",
          },
          {
            name: "Free Wifi",
            slug: "free_wifi",
          },
          {
            name: "Air conditioning",
            slug: "a/c",
          },
          {
            name: "Laundry",
            slug: "laundry",
          },
          {
            name: "Housekeeping",
            slug: "housekeeping",
          },
          {
            name: "Free Wifi",
            slug: "free_wifi",
          },
          {
            name: "Air conditioning",
            slug: "a/c",
          },
          {
            name: "Laundry",
            slug: "laundry",
          },
          {
            name: "Housekeeping",
            slug: "housekeeping",
          },
          {
            name: "Free Wifi",
            slug: "free_wifi",
          },
          {
            name: "Air conditioning",
            slug: "a/c",
          },
        ],
        with_fees_and_taxes: true,
        price: 225,
      })),
    },
  };

  return CheckValidation(HotelServiceDetailsApiResponseValidationSchema, data);
};
