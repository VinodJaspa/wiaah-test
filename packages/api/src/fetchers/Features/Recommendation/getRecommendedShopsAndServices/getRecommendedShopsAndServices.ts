import { QueryPaginationInputs, FormatedSearchableFilter } from "api";
import { AsyncReturnType, ServicesType } from "types";
import { randomNum } from "utils";
import {
  CheckValidation,
  InferType,
  RecommendedShopsApiResponseValidationSchema,
} from "validation";

export type RecommendedShopsAndServicesApiResponse = InferType<
  typeof RecommendedShopsApiResponseValidationSchema
>;

// const data: Recommendation[] = [
//   {
//     type: "hotel",
//     data: {
//       date: {
//         from: new Date().toString(),
//         to: new Date().toString(),
//       },
//       description: "description",
//       id: "123",
//       location: {
//         address: "address",
//         city: "city",
//         cords: {
//           lat: 123,
//           lng: 15,
//         },
//         country: "country",
//         countryCode: "CH",
//         postalCode: 123,
//         state: "Geneve",
//       },
//       name: "hotel name",
//       price: randomNum(500),
//       provider: "service provider",
//       rate: randomNum(5),
//       thumbnail: "/shop-2.jpeg",
//     },
//   },
//   {
//     type: "resturant",
//     data: {
//       id: `${13}`,
//       averagePrice: randomNum(100),
//       name: "Le bruit qui court",
//       isGoodDeal: true,
//       rate: parseInt(`${randomNum(9)}.${randomNum(9)}`),
//       reviewsCount: randomNum(600),
//       thumbnails: [
//         "/place-2.jpg",
//         "/place-2.jpg",
//         "/place-2.jpg",
//         "/place-2.jpg",
//       ],
//       location: {
//         address: "69ter rue damremont",
//         postalCode: 75018,
//         city: "paris",
//         country: "France",
//         state: "geneve",
//         cords: {
//           lat: 12.13,
//           lng: 21.3214,
//         },
//         countryCode: "CHF",
//       },
//       discount: {
//         amount: 50,
//         rule: "sur la carte",
//       },
//       tags: ["italian", "healthy", "pizza"],
//     },
//   },
//   {
//     type: "health_center",
//     data: {
//       location: {
//         address: "address",
//         city: "city",
//         cords: {
//           lat: 15,
//           lng: 15,
//         },
//         country: "france",
//         countryCode: "FR",
//         postalCode: 1322,
//         state: "Geneve",
//       },
//       id: `${123}`,
//       rate: randomNum(15),
//       name: "",
//       photo:
//         "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
//       specialty: "Dentist",
//     },
//   },
//   {
//     type: "vehicle",
//     data: {
//       id: `${132}`,
//       name: "Lucky Dip Car",
//       pricePerDay: 111,
//       thumbnail:
//         "https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/1_rangerover_tracking.jpg",

//       vehicleProps: [
//         {
//           type: "a/c",
//           value: true,
//         },
//         {
//           type: "gps",
//           value: true,
//         },
//         {
//           type: "passengers",
//           value: 5,
//         },
//         {
//           type: "windows",
//           value: 4,
//         },
//         {
//           type: "bags",
//           value: 3,
//         },
//       ],
//     },
//   },
//   {
//     type: "beauty_center",
//     data: {
//       id: `${112}`,
//       name: "Green Leaf Treatments",
//       rate: randomNum(5),
//       reviews: randomNum(1565),
//       owners: ["Perry", "Birmingham"],
//       thumbnail:
//         "https://www.ariostea-high-tech.com/img/progetti/hotel-spa-wellness/U714/Tacha+Beauty+Center-desktop.jpg",
//     },
//   },
//   {
//     type: "shop",
//     data: {
//       id: "132",
//       name: "shop",
//       rate: randomNum(5),
//       thumbnail: "/shop-2.jpeg",
//       categories: [],
//       location: {
//         address: "address",
//         city: "city",
//         cords: {
//           lat: 15,
//           lng: 15,
//         },
//         country: "france",
//         countryCode: "FR",
//         postalCode: 1322,
//         state: "Geneve",
//       },
//     },
//   },
// ];

const shopTypes: ServicesType[] = [
  "hotel",
  "resturant",
  "health_center",
  "vehicle",
  "holidays_rentals",
  "beauty_center",
];

const shopLabels = [
  "Hotel",
  "Restaurant",
  "Health Center",
  "Vehicle",
  "Holidays Rentals",
  "Beauty Center",
  "Ready to wear",
  "Video Game",
];

export const GetRecommendedShopsFetcher = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
): Promise<RecommendedShopsAndServicesApiResponse> => {
  const res: AsyncReturnType<typeof GetRecommendedShopsFetcher> = {
    hasMore: false,
    total: 135,
    data: [...Array(pagination.take)].map((_, i) => ({
      id: `${i}`,
      name: "shop name",
      thumbnail: "/shop-2.jpeg",
      label: shopLabels[randomNum(shopLabels.length)],
      type: shopTypes[randomNum(shopTypes.length)],
    })),
  };

  console.log("res", res);

  return CheckValidation(RecommendedShopsApiResponseValidationSchema, res);
};
