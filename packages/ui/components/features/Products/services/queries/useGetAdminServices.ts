import { createGraphqlRequestClient, Exact } from "api";
import {
  GetFilteredServicesAdminInput,
  Maybe,
  Profile,
  Service,
  ServiceType,
} from "@features/API";
import { useQuery } from "react-query";

export type GetAdminServicesQueryVariables = Exact<{
  args: GetFilteredServicesAdminInput;
}>;

export type GetAdminServicesQuery = { __typename?: "Query" } & {
  getAdminFilteredProducts: Array<
    { __typename?: "Service" } & Pick<
      Service,
      "name" | "sellerId" | "id" | "price" | "thumbnail" | "type"
    > & {
      seller: { __typename?: "Account" } & {
        profile?: Maybe<
          { __typename?: "Profile" } & Pick<Profile, "username">
        >;
      };
    }
  >;
};

export const useGetAdminServiceQuery = (
  input: GetFilteredServicesAdminInput,
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getAdminProducts(
        $args: GetFilteredProductsAdminInput!
    ){
        getAdminFilteredProducts(
            args: $args
        ){
            name
            sellerId
            id
            price
            thumbnail
            type
            seller {
                profile {
                    username
                }
            }
        }
    }
  `);

  client.setVariables<GetAdminServicesQueryVariables>({
    args: input,
  });

  return useQuery(["get-admin-products", { input }], async () => {
    const res: GetAdminServicesQuery["getAdminFilteredProducts"] = [
      ...Array(5),
    ].map((_, i) => ({
      name: `Product ${i + 1}`,
      sellerId: "seller-123",
      id: `${i}`,
      price: 99.99,
      thumbnail: `/images/product-${i + 1}.jpg`,
      type: ServiceType.Hotel,
      seller: {
        __typename: "Account",
        profile: {
          __typename: "Profile",
          username: `seller_${i + 1}`,
        },
      },
    }));
    return res;
  });
};
