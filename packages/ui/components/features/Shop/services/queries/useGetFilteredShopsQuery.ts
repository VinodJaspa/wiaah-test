import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FilteredShopsInput = {
  storeType?: Maybe<StoreType>;
  vendorType?: Maybe<VendorType>;
  targetGender?: Maybe<TargetGenders>;
  country?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  pagination: GqlPaginationInput;
};

type GqlPaginationInput = {
  page: Scalars["Int"];
  take: Scalars["Int"];
};
enum StoreType {
  Product = "product",
  Service = "service",
}

enum VendorType {
  Profissional = "profissional",
  Individual = "individual",
}

enum TargetGenders {
  Male = "male",
  Female = "female",
}

export type Shop = {
  __typename?: "Shop";
  id: Scalars["ID"];
  name: Scalars["String"];
  ownerId: Scalars["String"];
  location: Location;
  description: Scalars["String"];
  banner: Scalars["String"];
  verified: Scalars["Boolean"];
  storeType: Array<StoreType>;
  vendorType: Array<VendorType>;
  targetGenders: Array<TargetGenders>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Location = {
  __typename?: "Location";
  lat: Scalars["Float"];
  long: Scalars["Float"];
  address: Scalars["String"];
  country: Scalars["String"];
  city: Scalars["String"];
  state: Scalars["String"];
};

export const useGetFilteredShopsQuery = (input: FilteredShopsInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  query getShops(
    $input:FilteredShopsInput
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
        }
    }
`);

  client.setVariables(input);

  return useQuery<any, unknown, { data: Shop[] }>("filtered-products", () =>
    client.send()
  );
};
