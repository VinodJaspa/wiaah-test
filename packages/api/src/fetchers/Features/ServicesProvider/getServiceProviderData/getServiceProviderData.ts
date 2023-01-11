import { FormatedSearchableFilter } from "api/src";
import { createGraphqlRequestClient } from "api/src/utils";
import { GqlResponse } from "types";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ServiceOwnerAccount = {
  __typename?: "Account";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  verified: Scalars["Boolean"];
  photo: Scalars["String"];
};

export type ServiceContact = {
  __typename?: "ServiceContact";
  address: Scalars["String"];
  country: Scalars["String"];
  state?: Maybe<Scalars["String"]>;
  city: Scalars["String"];
  email: Scalars["String"];
  phone: Scalars["String"];
};

export type Hotel = {
  __typename?: "Hotel";
  owner: ServiceOwnerAccount;
  id: Scalars["ID"];
  ownerId: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  location: ServiceLocation;
  presentations: Array<ServicePresentation>;
  policies: Array<ServicePolicy>;
  serviceMetaInfo: ServiceMetaInfo;
  rooms: Array<HotelRoom>;
  contact: ServiceContact;
  workingHours: WorkingSchedule;
};

export type ServiceDayWorkingHours = {
  __typename?: "ServiceDayWorkingHours";
  periods: Array<Scalars["String"]>;
};

export type WeekdaysWorkingHours = {
  __typename?: "WeekdaysWorkingHours";
  mo?: Maybe<ServiceDayWorkingHours>;
  tu?: Maybe<ServiceDayWorkingHours>;
  we?: Maybe<ServiceDayWorkingHours>;
  th?: Maybe<ServiceDayWorkingHours>;
  fr?: Maybe<ServiceDayWorkingHours>;
  sa?: Maybe<ServiceDayWorkingHours>;
  su?: Maybe<ServiceDayWorkingHours>;
};

export type WorkingSchedule = {
  __typename?: "WorkingSchedule";
  id: Scalars["ID"];
  weekdays: WeekdaysWorkingHours;
};

export type HotelRoom = {
  __typename?: "HotelRoom";
  id: Scalars["ID"];
  hotel?: Maybe<Hotel>;
  hotelId: Scalars["ID"];
  sellerId: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  pricePerNight: Scalars["Int"];
  dailyPrice: Scalars["Boolean"];
  rating: Scalars["Float"];
  reviews: Scalars["Int"];
  dailyPrices?: Maybe<ServiceDailyPrices>;
  discount: ServiceDiscount;
  includedServices?: Maybe<Array<Scalars["String"]>>;
  popularAmenities?: Maybe<Array<ServiceAmenity>>;
  cancelationPolicies: Array<ServiceCancelationPolicy>;
  extras?: Maybe<Array<ServiceExtra>>;
  includedAmenities?: Maybe<Array<Scalars["String"]>>;
  beds: Scalars["Int"];
  bathrooms: Scalars["Int"];
  num_of_rooms: Scalars["Int"];
  measurements: ServicePropertyMeasurements;
};

export type ServicePresentation = {
  __typename?: "ServicePresentation";
  type: ServicePresentationType;
  src: Scalars["String"];
};

export enum ServicePresentationType {
  Img = "img",
  Vid = "vid",
}

export type ServicePolicy = {
  __typename?: "ServicePolicy";
  policyTitle: Scalars["String"];
  terms: Array<Scalars["String"]>;
};

export type ServiceMetaInfo = {
  __typename?: "ServiceMetaInfo";
  title: Scalars["String"];
  description: Scalars["String"];
  metaTagDescription: Scalars["String"];
  metaTagKeywords: Array<Scalars["String"]>;
  hashtags: Array<Scalars["String"]>;
};

export type ServiceDailyPrices = {
  __typename?: "ServiceDailyPrices";
  mo: Scalars["Int"];
  tu: Scalars["Int"];
  we: Scalars["Int"];
  th: Scalars["Int"];
  fr: Scalars["Int"];
  sa: Scalars["Int"];
  su: Scalars["Int"];
};

export type ServiceDiscount = {
  __typename?: "ServiceDiscount";
  value: Scalars["Int"];
  units: Scalars["Int"];
};

export type ServiceAmenity = {
  __typename?: "ServiceAmenity";
  value: Scalars["String"];
  label: Scalars["String"];
};

export type ServiceCancelationPolicy = {
  __typename?: "ServiceCancelationPolicy";
  duration: Scalars["Int"];
  cost: Scalars["Int"];
};

export type ServiceExtra = {
  __typename?: "ServiceExtra";
  name: Scalars["String"];
  cost: Scalars["Int"];
};

export type ServicePropertyMeasurements = {
  __typename?: "ServicePropertyMeasurements";
  inFeet: Scalars["Int"];
  inMeter: Scalars["Int"];
};

export type ServiceLocation = {
  __typename?: "ServiceLocation";
  address: Scalars["String"];
  country: Scalars["String"];
  state: Scalars["String"];
  city: Scalars["String"];
  lat: Scalars["Float"];
  lon: Scalars["Float"];
  postalCode: Scalars["Int"];
};

export type GetHotelServiceArgs = {
  id: Scalars["ID"];
};

export const getServicesProviderDataFetcher = async (
  args: GetHotelServiceArgs
): Promise<GqlResponse<Hotel, "getHotelService">> => {
  const client = createGraphqlRequestClient();
  client.setQuery(`
  query get($args:GetHotelServiceArgs!){
    getHotelService(
        getHotelServiceArgs:$args
    ){
        createdAt
        id
        ownerId
        policies{
            policyTitle
            terms
        }
        presentations{
            src
            type
        }
         location{
            address
            city
            country
            lat
            lon
             postalCode
             state
        }
        rooms{
            cancelationPolicies{
                cost
                duration
            }
            reviews
            rating
            createdAt
            dailyPrice
            dailyPrices{
                fr
                mo
                sa
                su
                th
                tu
                we
            }
            description
            discount{
                units
                value
            }
            extras{
                cost
                name
            }
            hotelId
            id
            includedAmenities
            includedServices
            measurements{
                inFeet
                inMeter
            }
            popularAmenities{
                label
                value
            }
            pricePerNight
            title
            updatedAt
        }
        serviceMetaInfo{
            description
            hashtags
            metaTagDescription
            metaTagKeywords
            title
        }
        updatedAt
        workingHours {
            id
            weekdays{
                fr{
                    periods
                }
                mo{
                    periods
                }
                sa{
                    periods
                }
                su{
                    periods
                }
                th{
                    periods
                }
                tu{
                    periods
                }
                we{
                    periods
                }    
            }
        }
        contact{
            address
            city
            country
            email
            phone
            state
        }
        owner{
            firstName
            lastName
            id
            verified
            email
            photo
        }
    }
  }
  `);
  const res = await client
    .setVariables({
      args,
    })
    .send<any>();
  return { data: res as any };
};

// const data: getServicesProviderDataFetcherResponse = {
//   data: {
//     name: "seller name",
//     id: "testid",
//     serviceTitle: "ibis Paris Maine Montparnasse 14th",
//     rating: 4.1,
//     reviewsCount: 1115,
//     thumbnail: "/shop-2.jpeg",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",
//     proprtyType: "hotel",
//     presintations: [
//       {
//         src: "https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg",
//         thumbnail:
//           "https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg",
//         type: "image",
//       },
//       {
//         src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
//         thumbnail:
//           "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
//         type: "image",
//       },
//       {
//         src: "https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?w=2000",
//         thumbnail:
//           "https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?w=2000",
//         type: "image",
//       },
//       {
//         src: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
//         thumbnail:
//           "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
//         type: "image",
//       },
//       {
//         src: "https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg",
//         thumbnail:
//           "https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg",
//         type: "image",
//       },
//       {
//         src: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
//         thumbnail:
//           "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
//         type: "image",
//       },
//       {
//         src: "https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?w=2000",
//         thumbnail:
//           "https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?w=2000",
//         type: "image",
//       },
//       {
//         src: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
//         thumbnail:
//           "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
//         type: "image",
//       },
//     ],
//     email: "Example@email.com",
//     location: {
//       address: "Rue du marche 34",
//       city: "Geneve",
//       country: "switzerland",
//       cords: {
//         lat: 45.464664,
//         lng: 9.18854,
//       },
//       countryCode: "USA",
//       state: "state",
//       postalCode: 1204,
//     },
//     telephone: "101227879123",
//     workingDays: [
//       {
//         weekDay: "Friday",

//         from: new Date(2022, 8, 11, 15).toString(),
//         to: new Date(2022, 8, 11, 19).toString(),
//       },
//       {
//         weekDay: "Monday",
//         from: new Date(2022, 8, 11, 15).toString(),
//         to: new Date(2022, 8, 11, 19).toString(),
//       },
//       {
//         weekDay: "Saturday",
//         from: new Date(2022, 8, 11, 15).toString(),
//         to: new Date(2022, 8, 11, 19).toString(),
//       },
//       {
//         weekDay: "Sunday",
//         from: new Date(2022, 8, 11, 15).toString(),
//         to: new Date(2022, 8, 11, 19).toString(),
//       },
//       {
//         weekDay: "Thursday",
//         from: new Date(2022, 8, 11, 15).toString(),
//         to: new Date(2022, 8, 11, 19).toString(),
//       },
//       {
//         weekDay: "Tuesday",
//         from: new Date(2022, 8, 11, 15).toString(),
//         to: new Date(2022, 8, 11, 19).toString(),
//       },
//       {
//         weekDay: "Wednesday",
//         from: new Date(2022, 8, 11, 15).toString(),
//         to: new Date(2022, 8, 11, 19).toString(),
//       },
//     ],
//     pricePerNight: 721,
//     serviceFee: 850,
//     taxes: 10,
//     PopularAmenities: [
//       {
//         name: "Kitchen",
//         slug: "kitchen",
//       },
//       {
//         name: "Televistion with Netflix",
//         slug: "tv",
//       },
//       {
//         name: "Washer",
//         slug: "laundry",
//       },
//       {
//         name: "Air conditioner",
//         slug: "a/c",
//       },
//       {
//         name: "Free Wifi",
//         slug: "free_wifi",
//       },
//       {
//         name: "Balcony or Patio",
//         slug: "balcony",
//       },
//     ],
//     deposit: 15,
//     policies: [
//       {
//         policyTerms: [
//           "Lorem Ipsum is simply dummy text of the printing and typesetting",
//           "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
//           "survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
//           "Ipsum passages, and more recently with desktop publishing",
//           "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of",
//           "packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
//         ],
//         policyTitle: "checkin - checkout terms",
//       },
//     ],
//     travelPeriod: {
//       departure: new Date(Date.now()).toUTCString(),
//       arrival: new Date(Date.now()).toUTCString(),
//     },
//     vat: randomNum(10),
//     rooms: [...Array(2)].map((_, i) => ({
//       extraServices: [
//         {
//           cost: 0,
//           name: "No extras",
//         },
//         {
//           cost: 10,
//           name: "Book now, pay later",
//         },
//         {
//           cost: 50,
//           name: "Breakfast",
//         },
//         {
//           cost: 60,
//           name: "Breakfast + Book now pay later",
//         },
//       ],
//       includes: ["breakfast", "park"],
//       discount: {
//         amount: randomNum(50),
//         units: randomNum(10),
//       },
//       size: {
//         inFeet: 30,
//         inMeter: 13,
//       },
//       id: `${i}`,
//       title: "Executive Double Room, 1 double bed",
//       thumbnails: ["/place-2.jpg", "/place-1.jpg"],
//       extras: [
//         "Free toiletries",
//         "Shower",
//         "Toilet",
//         "Towels",
//         "Private entrance",
//         "Hairdryer",
//         "Wardrobe or closet",
//         "Upper floors accessible by elevator",
//         "Toilet paper",
//         "Free toiletries",
//         "Toilet paper",
//         "Towels",
//       ],

//       cancelationPolicies: [
//         {
//           duration: 6,
//           cost: 0,
//           id: "1",
//         },
//         {
//           duration: 10,
//           cost: 10,
//           id: "2",
//         },
//         {
//           cost: 50,
//           duration: 0,
//           id: "3",
//         },
//         {
//           id: "4",
//           cost: 0,
//           duration: 0,
//         },
//       ],
//       amenities: [
//         {
//           name: "Kitchen",
//           slug: "kitchen",
//         },
//         {
//           name: "Televistion with Netflix",
//           slug: "tv",
//         },
//         {
//           name: "Washer",
//           slug: "laundry",
//         },
//         {
//           name: "Air conditioner",
//           slug: "a/c",
//         },
//         {
//           name: "Free Wifi",
//           slug: "free_wifi",
//         },
//         {
//           name: "Balcony or Patio",
//           slug: "balcony",
//         },
//       ],
//       with_fees_and_taxes: true,
//       price: 225,
//     })),
//   },
// };
