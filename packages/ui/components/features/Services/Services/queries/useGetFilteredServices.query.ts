import { WorkingDaysCalenderProps } from "@blocks";
import {
  Exact,
  SearchServicesInput,
  ServiceAdaptation,
  ServiceType,
  ShopStatus,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

type SearchServiceQueryVariables = Exact<{
  args: SearchServicesInput;
}>;

export type SearchServiceQuery = {
  __typename?: "Query";
  searchServices: {
    __typename?: "ServiceSearchResponse";
    hasMore: boolean;
    total: number;
    data: Array<{
      __typename?: "Service";
      id: string;
      name: string;
      price: string;
      beds?: number | null;
      bathrooms?: number | null;
      adaptedFor?: Array<ServiceAdaptation> | null;
      airCondition?: boolean | null;
      gpsAvailable?: boolean | null;
      seats?: number | null;
      windows?: number | null;
      lugaggeCapacity?: number | null;
      treatmentCategory?: string | null;
      maxSpeedInKm?: number | null;
      brand?: string | null;
      description: string;
      ingredients?: Array<string> | null;
      cleaningFee?: number | null;
      reviews: number;
      thumbnail: string;
      rating: number;
      type: ServiceType;
      title: string;
      speciality?: string | null;
      availableAppointments?: WorkingDaysCalenderProps["workingDates"];
      healthCenterBookedAppointments: WorkingDaysCalenderProps["workingDates"];
      saved: boolean;
      sellerId: string;
      updatedAt: string;
      shop: {
        __typename?: "Shop";
        id: string;
        status: ShopStatus;
        location: {
          __typename?: "Location";
          address: string;
          city: string;
          country: string;
          lat: number;
          long: number;
          state: string;
        };
        sellerProfile: {
          __typename?: "Profile";
          username: string;
          verified: boolean;
          photo: string;
        };
      };
    }>;
  };
};

type args = SearchServiceQueryVariables["args"];
export const getFilteredServicesQuery = (args: args) => [
  "get-filtered-services",
  { args },
];
type DevArgs = SearchServicesInput & { serviceType?: ServiceType };
export const useGetFilteredServicesQuery = (args: DevArgs) =>
  useQuery(getFilteredServicesQuery(args), async () => {
    const client = createGraphqlRequestClient();
 if (process.env.NODE_ENV === "development") {
     // ✅ Use mock data only in development
  console.log(args.serviceType,"mockServices");
  
 const filtered = args?.serviceType
  ? mockServices.filter((s) => {
      const match = s.type === args.serviceType;
      console.log(s.type, args.serviceType, match, "typeee");
      return match; // important: return boolean
    })
  : mockServices; // return all if no type provided


      return {
        __typename: "ServiceSearchResponse" as const,
        hasMore: false,
        total: filtered.length,
        data: filtered,
      };
    
    }
    const res = await client
      .setQuery(
        `
query SearchService($args: SearchServicesInput!) {
  searchServices(args: $args) {
    data {
      id
      name
      price
      beds
      bathrooms
      adaptedFor
      airCondition
      gpsAvailable
      seats
      windows
      lugaggeCapacity
      treatmentCategory
      maxSpeedInKm
      brand
      description
      ingredients
      cleaningFee
      reviews
      thumbnail
      rating
      type
      speciality
      availableAppointments
      healthCenterBookedAppointments
      saved
      sellerId
      updatedAt
      shop {
        id
        status
        location {
          address
          city
          country
          lat
          long
          state
        }
        sellerProfile {
          username
          verified
          photo
        }
      }
    }
    hasMore
    total
  }
}

    `,
      )
      .setVariables<SearchServiceQueryVariables>({
        args,
      })
      .send<SearchServiceQuery>();

    return res.data.searchServices;
  });

// Helper: random int in range
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Generate one mock service
const restaurantDishes = [
  "Margherita Pizza",
  "Spaghetti Carbonara",
  "Grilled Salmon",
  "Caesar Salad",
  "Sushi Platter",
  "Tandoori Chicken",
  "Beef Burger",
  "Paella",
  "Ramen",
  "Chocolate Lava Cake",
];

const createMockService = (
  type: ServiceType,
  index: number
): SearchServiceQuery["searchServices"]["data"][number] => ({
  __typename: "Service",
  id: `${type}-${index}`,
  name:
    type === ServiceType.Restaurant
      ? `${restaurantDishes[index % restaurantDishes.length]} - ${type.replace("_", " ")} ${index}`
      : `${type.replace("_", " ")} Service ${index}`,
  price: "$" + rand(20, 500),
  beds:
    type === ServiceType.HolidayRentals || type === ServiceType.Hotel
      ? rand(1, 5)
      : undefined,
  bathrooms:
    type === ServiceType.HolidayRentals || type === ServiceType.Hotel
      ? rand(1, 3)
      : undefined,
  adaptedFor: undefined,
  airCondition: Math.random() > 0.5,
  gpsAvailable: Math.random() > 0.5,
  seats:
    type === ServiceType.Vehicle || type === ServiceType.Restaurant
      ? rand(2, 50)
      : undefined,
  windows: type === ServiceType.Vehicle ? rand(2, 6) : undefined,
  lugaggeCapacity: type === ServiceType.Vehicle ? rand(1, 5) : undefined,
  treatmentCategory:
    type === ServiceType.HealthCenter ? "General Checkup" : undefined,
  maxSpeedInKm: type === ServiceType.Vehicle ? rand(100, 350) : undefined,
  brand: type === ServiceType.Vehicle ? "BrandX" : undefined,
  description: `Mock description for ${type} ${index}`,
  ingredients:
    type === ServiceType.Restaurant
      ? ["Pasta", "Wine", "Cheese", "Olive Oil", "Garlic"]
      : undefined,
  cleaningFee:
    type === ServiceType.HolidayRentals ? rand(20, 80) : undefined,
  reviews: rand(5, 200),
  thumbnail: `https://picsum.photos/seed/${type}-${index}/400/300`,
  rating: +(Math.random() * 5).toFixed(1),
  type,
  title: type.replace("_", " "),
  speciality:
    type === ServiceType.BeautyCenter
      ? "Skin Care"
      : type === ServiceType.HealthCenter
      ? "Primary Care"
      : type === ServiceType.Restaurant
      ? "Italian"
      : undefined,
  availableAppointments: [],
  healthCenterBookedAppointments: [],
  saved: Math.random() > 0.5,
  sellerId: `seller-${type}-${index}`,
  updatedAt: new Date().toISOString(),
  shop: {
    __typename: "Shop",
    id: `shop-${type}-${index}`,
    status: ShopStatus.Active,
    location: {
      __typename: "Location",
      address: `${rand(1, 999)} ${type} Street`,
      city: "Mock City",
      country: "Mock Country",
      lat: rand(-90, 90),
      long: rand(-180, 180),
      state: "Mock State",
    },
    sellerProfile: {
      __typename: "Profile",
      username: `${type}-user-${index}`,
      verified: Math.random() > 0.5,
      photo: `https://picsum.photos/seed/${type}-profile-${index}/100/100`,
    },
  },
});


// Generate 10–20 per service type
export const mockServices: SearchServiceQuery["searchServices"]["data"] = Object.values(ServiceType)
  .flatMap((type) =>
    Array.from({ length: rand(10, 20) }, (_, i) => createMockService(type, i + 1)),
  );



