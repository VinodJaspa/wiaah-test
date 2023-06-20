import { createGraphqlRequestClient } from "api";
import { isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Exact,
  FilteredShopsCursorInput,
  FilteredShopsInput,
  ServiceType,
  StoreType,
} from "@features/API";
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import { getRandomHotelRoomName } from "@features/Statistics";

export type GetShopsQueryVariables = Exact<{
  input: FilteredShopsInput;
}>;

export type GetShopsQuery = {
  __typename?: "Query";
  getFilteredShops: Array<{
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

type args = GetShopsQueryVariables["input"];

export const getFilteredShopsQueryKey = (args: args) => [
  "get-filtered-shops",
  { args },
];

export const getFilteredShopsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getShops(
    $input:FilteredShopsInput!
){
    getFilteredShops(
        filteredShopsArgs:$input
    ){
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
`);

  client.setVariables<GetShopsQueryVariables>({ input: args });

  if (isDev) {
    const mockres: GetShopsQuery["getFilteredShops"] = [...Array(15)].map(
      () => ({
        banner: getRandomImage(),
        id: "",
        name: getRandomHotelRoomName(),
        ownerId: "",
        storeType: StoreType.Product,
        type: ServiceType.Hotel,
        verified: true,
      })
    );
    return mockres;
  }

  const res = await client.send<GetShopsQuery>();

  return res.data.getFilteredShops;
};

export const useGetFilteredShopsQuery = (args: args) =>
  useQuery(getFilteredShopsQueryKey(args), () =>
    getFilteredShopsQueryFetcher(args)
  );

export type GetFilteredShopsCursorQueryVariables = Exact<{
  args: FilteredShopsCursorInput;
}>;

export type GetFilteredShopsCursorQuery = {
  __typename?: "Query";
  getCursorFilteredShops: {
    __typename?: "ShopCursorPaginationResponse";
    cursor: string;
    hasMore: boolean;
    nextCursor: string;
    data: Array<{
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
      location: {
        __typename?: "Location";
        address: string;
        city: string;
        country: string;
        state: string;
      };
      sellerProfile: { __typename?: "Profile"; photo: string };
      workingSchedule: {
        __typename?: "ShopWorkingSchedule";
        isOpen: boolean;
        openFrom: string;
        openTo: string;
      };
    }>;
  };
};

type args1 = GetFilteredShopsCursorQueryVariables["args"];

export const getFilteredCursorShopsQuery = (args: args1) => [
  "get-filtered-cursor-shop",
  { args },
];

export const getFilteredCursorShopsQueryFetcher = async (args: args1) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `query getFilteredShopsCursor($args: FilteredShopsCursorInput!) {
  getCursorFilteredShops(args: $args) {
    cursor
    data {
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
    hasMore
    nextCursor
  }
}

`
    )
    .setVariables<GetFilteredShopsCursorQueryVariables>({ args })
    .send<GetFilteredShopsCursorQuery>();

  return res.data.getCursorFilteredShops;
};

export const useGetFilteredShopsInfiniteQuery = (
  args: args1,
  options?: UseInfiniteQueryOptions<
    GetFilteredShopsCursorQuery["getCursorFilteredShops"],
    unknown,
    GetFilteredShopsCursorQuery["getCursorFilteredShops"],
    GetFilteredShopsCursorQueryVariables["args"],
    any
  >
) =>
  useInfiniteQuery(
    getFilteredCursorShopsQuery(args),
    ({ pageParam }) =>
      getFilteredCursorShopsQueryFetcher({ ...args, cursor: pageParam }),
    options
  );
