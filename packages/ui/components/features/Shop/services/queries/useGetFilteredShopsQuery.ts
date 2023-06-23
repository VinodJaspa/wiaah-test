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

  return useQuery<any, unknown, { data: Shop[] }>("filtered-products", () =>
    client.send()
  );
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
