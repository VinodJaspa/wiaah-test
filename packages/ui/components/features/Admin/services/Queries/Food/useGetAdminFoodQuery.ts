import {
  AdminGetDishsInput,
  Dish,
  Exact,
  Maybe,
  Profile,
  RestaurantDishType,
  ServiceLocation,
} from "@features/API";
import { randomNum } from "@UI/../utils/src";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

type RestaurantEstablishmentType = {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
  createdById: string;
};

export type GetAdminDishsQueryVariables = Exact<{
  args: AdminGetDishsInput;
}>;

export type GetAdminDishsQuery = { __typename?: "Query" } & {
  adminGetDishs: Array<
    { __typename?: "Dish" } & Pick<
      Dish,
      "id" | "name" | "thumbnail" | "type" | "sales"
    > & {
      menu: { __typename?: "RestaurantMenu" } & {
        restaurant: { __typename?: "ServiceDetails" } & {
          location: { __typename?: "ServiceLocation" } & Pick<
            ServiceLocation,
            "country" | "city"
          >;
          establishmentType: {
            __typename?: "RestaurantEstablishmentType";
          } & Pick<RestaurantEstablishmentType, "name">;
          owner: { __typename?: "Account" } & {
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<Profile, "username">
            >;
          };
        };
      };
    }
  >;
};

type args = GetAdminDishsQueryVariables["args"];
export const adminGetFoodQueryKey = (args: args) => [
  "admin-get-food",
  { args },
];

export const useGetAdminFoodQuery = (args: args) =>
  useQuery(adminGetFoodQueryKey(args), async () => {
    const client = createGraphqlRequestClient();
    client.setQuery(`
query getAdminDishs(
  $args:AdminGetDishsInput!
){
  adminGetDishs(args:$args) {
    id
    name
    thumbnail
    type
    sales
    menu{
      restaurant{
        location{
          country
          city
        }
        establishmentType {
          name
        }
        owner{
          profile{
            username
          }
        }
      }
    }
  }
}
    `);

    client.setVariables<GetAdminDishsQueryVariables>({
      args,
    });

    const data: GetAdminDishsQuery["adminGetDishs"] = [...Array(8)].map(
      (v, i) => ({
        id: i.toString(),
        name: `dish-${i}`,
        menu: {
          restaurant: {
            location: {
              country: "switzerland",
              city: "geneve",
            },
            owner: {
              profile: {
                username: `seller-${i}`,
              },
            },
            establishmentType: {
              name: `type-${i}`,
            },
          },
        },
        sales: randomNum(10000),
        thumbnail:
          "https://www.foodandwine.com/thmb/gRrfFwDl3N3uBOdWINoJKMqE8kk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/201012-ss-dishes-lamb-ragu-1f516715f31244f295426cf2d50193f2.jpg",
        type: Object.values(RestaurantDishType)[
          i % Object.values(RestaurantDishType).length
        ],
      })
    );

    return data;
    const res = await client.send<GetAdminDishsQuery>();

    return res.data.adminGetDishs;
  });
