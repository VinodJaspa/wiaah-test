import {
  Dish,
  Account,
  ServicePresentationType,
  ServiceStatus,
  ServicePaymentMethod,
  ServiceCancelationPolicy,
} from "@features/API";
import {
  Exact,
  GetRestaurantInput,
  Maybe,
  Restaurant,
  RestaurantMenu,
  ServiceContact,
  ServiceDayWorkingHours,
  ServiceLocation,
  ServiceMetaInfo,
  ServicePolicy,
  ServicePresentation,
  WorkingSchedule,
} from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type GetRestaurantQueryVariables = Exact<{
  args: GetRestaurantInput;
}>;

export type GetRestaurantQuery = { __typename?: "Query" } & {
  getRestaurant: { __typename?: "Restaurant" } & Pick<
    Restaurant,
    | "cuisinesTypeId"
    | "establishmentTypeId"
    | "highest_price"
    | "id"
    | "lowest_price"
    | "michelin_guide_stars"
    | "ownerId"
    | "payment_methods"
    | "setting_and_ambianceId"
    | "status"
    | "vat"
  > & {
      location: { __typename?: "ServiceLocation" } & Pick<
        ServiceLocation,
        "address" | "city" | "country" | "lat" | "lon" | "postalCode" | "state"
      >;
      menus: Array<
        { __typename?: "RestaurantMenu" } & Pick<
          RestaurantMenu,
          "id" | "name"
        > & {
            dishs: Array<
              { __typename?: "Dish" } & Pick<
                Dish,
                "id" | "ingredients" | "price" | "name" | "thumbnail"
              >
            >;
          }
      >;
      policies: Array<
        { __typename?: "ServicePolicy" } & Pick<
          ServicePolicy,
          "policyTitle" | "terms"
        >
      >;
      presentations: Array<
        { __typename?: "ServicePresentation" } & Pick<
          ServicePresentation,
          "src" | "type"
        >
      >;
      serviceMetaInfo: { __typename?: "ServiceMetaInfo" } & Pick<
        ServiceMetaInfo,
        | "description"
        | "hashtags"
        | "metaTagDescription"
        | "title"
        | "metaTagKeywords"
      >;
      contact: { __typename?: "ServiceContact" } & Pick<
        ServiceContact,
        "address" | "city" | "country" | "email" | "phone" | "state"
      >;
      cancelationPolicies: Array<
        { __typename?: "ServiceCancelationPolicy" } & Pick<
          ServiceCancelationPolicy,
          "cost" | "duration"
        >
      >;
      owner: { __typename?: "Account" } & Pick<
        Account,
        "firstName" | "lastName" | "id" | "photo" | "verified"
      >;
      workingHours?: Maybe<
        { __typename?: "WorkingSchedule" } & Pick<WorkingSchedule, "id"> & {
            weekdays: { __typename?: "WeekdaysWorkingHours" } & {
              fr?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
              mo?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
              sa?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
              su?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
              th?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
              tu?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
              we?: Maybe<
                { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >
              >;
            };
          }
      >;
    };
};

export const getRestaurantServiceProviderDetailsDataQuerykey = (id: string) => [
  "resturantServiceDetialsData",
  { id },
];
export const useGetRestaurantServiceDetailsDataQuery = (id: string) => {
  return useQuery(
    getRestaurantServiceProviderDetailsDataQuerykey(id),
    async () => {
      const client = createGraphqlRequestClient();

      client.setQuery(`
query getRestaurant($args:GetRestaurantInput!){
    getRestaurant(
        getRestaurantArgs:$args
    ){
        cuisinesTypeId
        establishmentTypeId
        highest_price
        id
        location{
            address
            city
            country
            lat
            lon
            postalCode
            state
        }
        lowest_price
        menus{
            dishs{
                id
                ingredients
                price
                name
                thumbnail
            }
            id
            name
        }
        michelin_guide_stars
        ownerId
        payment_methods
        policies{
            policyTitle
            terms
        }
        presentations{
            src
            type
        }
        serviceMetaInfo{
            description
            hashtags
            metaTagDescription
            title
            metaTagKeywords
        }
        setting_and_ambianceId
        status
        vat
        contact {
            address
            city
            country
            email
            phone
            state
        }
        owner {
            firstName
            lastName
            id
            photo
            verified
        }
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
    }
}
`);

      const data: GetRestaurantQuery["getRestaurant"] = {
        cancelationPolicies: [
          {
            cost: 5,
            duration: 4,
          },
          {
            cost: 0,
            duration: 2,
          },
          {
            cost: 10,
            duration: 6,
          },
        ],
        cuisinesTypeId: "italian",
        establishmentTypeId: "restaurant",
        highest_price: 50,
        id: "12345",

        location: {
          address: "123 Main St",
          city: "New York",
          country: "USA",
          lat: 40.7128,
          lon: -74.006,
          postalCode: 10001,
          state: "NY",
        },
        lowest_price: 20,
        menus: [
          {
            dishs: [
              {
                id: "54321",
                ingredients: ["tomatoes", "basil", "mozzarella"],
                price: 12,
                name: "Margherita Pizza",
                thumbnail:
                  "https://www.foodandwine.com/thmb/EuorRdLisZJ5XCD1ZJJnGXGHP_4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/201012-ss-dishes-leeks-7624862883b54db29fbfa87295ba42ac.jpg",
              },
              {
                id: "67890",
                ingredients: ["pasta", "tomato sauce", "parmesan cheese"],
                price: 16,
                name: "Spaghetti Pomodoro",
                thumbnail:
                  "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/10/4/1/FN_chain-restaurant-entrees_Applebees_Bourbon-Street-Chicken-Shrimp_s6x4.jpg.rend.hgtvcom.616.411.suffix/1538685780055.jpeg",
              },
            ],
            id: "menu123",
            name: "Dinner Menu",
          },
          {
            dishs: [
              {
                id: "98765",
                ingredients: [
                  "lettuce",
                  "tomatoes",
                  "cucumber",
                  " olives",
                  "feta cheese",
                ],
                price: 10,
                name: "Greek Salad",
                thumbnail:
                  "https://www.foodandwine.com/thmb/gRrfFwDl3N3uBOdWINoJKMqE8kk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/201012-ss-dishes-lamb-ragu-1f516715f31244f295426cf2d50193f2.jpg",
              },
              {
                id: "23456",
                ingredients: [
                  "grilled chicken",
                  "lettuce",
                  "croutons",
                  "parmesan cheese",
                  "Caesar dressing",
                ],
                price: 14,
                name: "Caesar Salad",
                thumbnail:
                  "https://robbreport.com/wp-content/uploads/2020/12/manti-dumplings-albi-dc.jpg?w=1000",
              },
            ],
            id: "menu456",
            name: "Lunch Menu",
          },
        ],
        michelin_guide_stars: 1,
        ownerId: "67890",
        payment_methods: [
          ServicePaymentMethod.Cash,
          ServicePaymentMethod.CreditCard,
        ],
        policies: [
          {
            policyTitle: "Cancellation Policy",
            terms: ["Cancel at least 24 hours in advance to avoid penalty."],
          },
          {
            policyTitle: "Dress Code",
            terms: ["Business casual attire is required."],
          },
        ],
        presentations: [
          {
            src: "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_nuit_v2-scaled.jpg",
            type: ServicePresentationType.Img,
          },
          {
            src: "https://www.spoon-restaurant.com/wp-content/uploads/2022/06/Spoon_cLe_Bonbon-1-scaled.jpg",
            type: ServicePresentationType.Img,
          },
        ],
        serviceMetaInfo: {
          description:
            "Authentic Italian restaurant serving classic dishes in a cozy atmosphere.",
          hashtags: ["italianfood", "foodie", "nyc"],
          metaTagDescription:
            "Authentic Italian restaurant serving classic dishes in a cozy atmosphere.",
          metaTagKeywords: ["Italian food", "restaurant", " New York City"],
          title: "Trattoria Italia",
        },
        setting_and_ambianceId: "cozy",
        status: ServiceStatus.Active,
        vat: 0.08,
        contact: {
          address: "123 Main St",
          city: "New York",
          country: "USA",
          email: "email",
          phone: "12435576",
          state: "state",
        },
        owner: {
          firstName: "first name",
          id: "12321",
          lastName: "last name",
          verified: true,
          photo: "profile (2).jfif",
        },
      };

      return data;
      client.setVariables<GetRestaurantQueryVariables>({
        args: {
          id,
        },
      });

      const res = await client.send<GetRestaurantQuery>();

      return res.data.getRestaurant;
    }
  );
};
