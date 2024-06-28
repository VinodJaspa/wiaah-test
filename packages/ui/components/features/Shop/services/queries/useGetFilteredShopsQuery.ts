import { createGraphqlRequestClient } from "api";
import { isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Exact,
  FilteredShopsCursorInput,
  ServiceType,
  StoreType,
} from "@features/API";
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  InfiniteData,
  QueryFunction,
  QueryKey,
} from "react-query";
import { getRandomHotelRoomName } from "@features/Statistics";

// Types for GetFilteredShopsCursorQuery
export type GetFilteredShopsCursorQueryVariables = Exact<{
  args: FilteredShopsCursorInput;
}>;

export type GetFilteredShopsCursorQuery = {
  __typename?: "Query";
  getCursorFilteredShops: {
    __typename?: "FilteredShopsCursorResult";
    cursor: string | null;
    shops: Array<{
      __typename?: "Shop";
      id: string;
      banner: string;
      name: string;
      ownerId: string;
      verified: boolean;
      storeType: StoreType;
      type?: ServiceType | null;
      thumbnail: string;
      storeCategory: string;
      workingSchedule: {
        __typename?: "ShopWorkingSchedule";
        isOpen: boolean;
        openFrom: string;
        openTo: string;
      };
    }>;
  };
};

// Query key for cursor-based fetching
export const getFilteredCursorShopsQueryKey = (
  args: FilteredShopsCursorInput,
): QueryKey => ["get-filtered-cursor-shops", { args }];

// Fetcher function for cursor-based fetching
export const getFilteredCursorShopsQueryFetcher: QueryFunction<
  GetFilteredShopsCursorQuery["getCursorFilteredShops"],
  QueryKey
> = async ({ queryKey }) => {
  const [{ args }] = queryKey as [{ args: FilteredShopsCursorInput }];
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getCursorFilteredShops($args: FilteredShopsCursorInput!) {
      getCursorFilteredShops(filteredShopsCursorArgs: $args) {
        cursor
        shops {
          id
          banner
          name
          ownerId
          verified
          storeType
          type
          thumbnail
          storeCategory
          workingSchedule {
            isOpen
            openFrom
            openTo
          }
        }
      }
    }
  `);

  client.setVariables<GetFilteredShopsCursorQueryVariables>({ args });

  if (isDev) {
    const mockres: GetFilteredShopsCursorQuery["getCursorFilteredShops"] = {
      cursor: null,
      shops: [...Array(15)].map(() => ({
        __typename: "Shop",
        id: Math.random().toString(36).substr(2, 9),
        banner: getRandomImage(),
        name: getRandomHotelRoomName(),
        ownerId: Math.random().toString(36).substr(2, 9),
        verified: true,
        storeType: StoreType.Product,
        type: ServiceType.Hotel,
        thumbnail: getRandomImage(),
        storeCategory: "Mock Category",
        workingSchedule: {
          __typename: "ShopWorkingSchedule",
          isOpen: true,
          openFrom: "08:00",
          openTo: "22:00",
        },
      })),
    };
    return mockres;
  }

  const res = await client.send<GetFilteredShopsCursorQuery>();
  return res.data.getCursorFilteredShops;
};

// Hook for cursor-based fetching
export const useGetFilteredShopsInfiniteQuery = (
  args: FilteredShopsCursorInput,
  options?: Omit<
    UseInfiniteQueryOptions<
      GetFilteredShopsCursorQuery["getCursorFilteredShops"],
      unknown,
      GetFilteredShopsCursorQuery["getCursorFilteredShops"],
      GetFilteredShopsCursorQuery["getCursorFilteredShops"],
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) =>
  useInfiniteQuery<
    GetFilteredShopsCursorQuery["getCursorFilteredShops"],
    unknown,
    GetFilteredShopsCursorQuery["getCursorFilteredShops"],
    QueryKey
  >(
    getFilteredCursorShopsQueryKey(args),
    getFilteredCursorShopsQueryFetcher,
    options,
  );
