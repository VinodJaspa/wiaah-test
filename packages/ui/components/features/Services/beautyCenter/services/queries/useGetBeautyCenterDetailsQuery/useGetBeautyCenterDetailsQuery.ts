import {
  Account,
  BeautyCenter,
  Exact,
  Scalars,
  ServiceCancelationPolicy,
  Treatment,
  BeautyCenterTreatmentCategory,
  Maybe,
  ServiceContact,
  ServiceDayWorkingHours,
  ServiceDiscount,
  ServiceLocation,
  ServiceMetaInfo,
  ServicePolicy,
  ServicePresentation,
  WorkingSchedule,
  ServicePresentationType,
  ServicePaymentMethod,
  ServiceStatus,
  ServiceTypeOfSeller,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { random } from "lodash";

export type GetBeautyQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetBeautyQuery = { __typename?: "Query" } & {
  getBeautyCenterById: { __typename?: "BeautyCenter" } & Pick<
    BeautyCenter,
    | "beauty_center_typeId"
    | "createdAt"
    | "id"
    | "ownerId"
    | "payment_methods"
    | "rating"
    | "status"
    | "title"
    | "totalReviews"
    | "type_of_seller"
    | "updatedAt"
    | "vat"
  > & {
      cancelationPolicies: Array<
        { __typename?: "ServiceCancelationPolicy" } & Pick<
          ServiceCancelationPolicy,
          "cost" | "duration"
        >
      >;
      location: { __typename?: "ServiceLocation" } & Pick<
        ServiceLocation,
        "address" | "city" | "country" | "lat" | "lon" | "postalCode" | "state"
      >;
      owner?: Maybe<
        { __typename?: "Account" } & Pick<
          Account,
          "firstName" | "lastName" | "email" | "photo" | "verified"
        >
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
        | "metaTagKeywords"
        | "title"
      >;
      treatments: Array<
        { __typename?: "Treatment" } & Pick<
          Treatment,
          | "duration"
          | "id"
          | "price"
          | "title"
          | "treatmentCategoryId"
          | "beautyCenterServiceId"
          | "thumbnail"
        > & {
            category?: Maybe<
              { __typename?: "BeautyCenterTreatmentCategory" } & Pick<
                BeautyCenterTreatmentCategory,
                "createdAt" | "createdById" | "id" | "title" | "updatedAt"
              >
            >;
            discount: { __typename?: "ServiceDiscount" } & Pick<
              ServiceDiscount,
              "units" | "value"
            >;
          }
      >;
      contact: { __typename?: "ServiceContact" } & Pick<
        ServiceContact,
        "address" | "city" | "country" | "email" | "phone" | "state"
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

export const getBeautyCenterDetailsDataQueryKey = (args: { id: string }) => [
  "beautyCenterDetailsData",
  args || {},
];

export const useGetBeautyCenterDetailsQuery = (id: string) => {
  return useQuery(getBeautyCenterDetailsDataQueryKey({ id }), async () => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
    query getBeauty(
    $id: String!
){
    getBeautyCenterById(
        id:$id
    ){
        beauty_center_typeId
        cancelationPolicies{
            cost
            duration
        }
        createdAt
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
        owner{
            firstName
            lastName
            email
            photo
            verified
        }
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
        rating
        serviceMetaInfo {
            description
            hashtags
            metaTagDescription
            metaTagKeywords
            title
        }
        status
        title
        totalReviews
        treatments {
            category {
                createdAt
                createdById
                id
                title
                updatedAt
            }
            discount{
                units
                value
            }
            duration
            id
            price
            title
            treatmentCategoryId
        }
        type_of_seller
        updatedAt
        vat
        contact{
            address
            city
            country
            email
            phone
            state
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

    const data: GetBeautyQuery["getBeautyCenterById"] = {
      createdAt: "2023-03-06T00:00:00Z",
      id: "12345",
      ownerId: "67890",
      policies: [
        {
          policyTitle: "Cancellation Policy",
          terms: ["Full refund if canceled within 24 hours"],
        },
      ],
      presentations: [
        {
          src: "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
          type: ServicePresentationType.Img,
        },
        {
          src: "https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg",
          type: ServicePresentationType.Img,
        },
        {
          src: "https://image-tc.galaxy.tf/wijpeg-5fj3s48cv2nf9rs8mv5amtpab/select-room-one-bedroom-3.jpg?width=1920",
          type: ServicePresentationType.Img,
        },
        {
          src: "https://www.ohotelsindia.com/pune/images/b32d5dc553ee2097368bae13f83e93cf.jpg",
          type: ServicePresentationType.Img,
        },
      ],
      location: {
        address: "123 Main St",
        city: "Anytown",
        country: "USA",
        lat: 37.7749,
        lon: -122.4194,
        postalCode: 12345,
        state: "CA",
      },
      beauty_center_typeId: "",
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
      payment_methods: [
        ServicePaymentMethod.Cash,
        ServicePaymentMethod.CreditCard,
      ],
      rating: 4,
      status: ServiceStatus.Active,
      title: "title",
      totalReviews: 156,
      treatments: [
        {
          discount: {
            units: 15,
            value: 10,
          },
          duration: [30, 60],
          id: "",
          price: 160,
          beautyCenterServiceId: "test",
          thumbnail:
            "https://www.lifeclass.net/media/1248/beauty-center-face-massage-woman.jpg",
          title: "back pain treatment",
          treatmentCategoryId: "",
          category: {
            title: "body treatment",
            createdAt: new Date().toString(),
            createdById: "",
            id: "",
            updatedAt: new Date().toString(),
          },
        },
        {
          beautyCenterServiceId: "test",
          thumbnail:
            "https://www.lifeclass.net/media/1248/beauty-center-face-massage-woman.jpg",
          discount: {
            units: 15,
            value: 10,
          },
          duration: [30, 60],
          id: "",
          price: 160,
          title: "back pain treatment",
          treatmentCategoryId: "",
          category: {
            title: "body treatment",
            createdAt: new Date().toString(),
            createdById: "",
            id: "",
            updatedAt: new Date().toString(),
          },
        },
        {
          beautyCenterServiceId: "test",
          thumbnail:
            "https://www.lifeclass.net/media/1248/beauty-center-face-massage-woman.jpg",
          discount: {
            units: 15,
            value: 10,
          },
          duration: [30, 60],
          id: "",
          price: 160,
          title: "back pain treatment",
          treatmentCategoryId: "",
          category: {
            title: "body treatment",
            createdAt: new Date().toString(),
            createdById: "",
            id: "",
            updatedAt: new Date().toString(),
          },
        },
      ],
      type_of_seller: ServiceTypeOfSeller.Individual,
      vat: 10,
      serviceMetaInfo: {
        description: "A great hotel in a prime location",
        hashtags: ["#travel", "#vacation", "#hotel"],
        metaTagDescription:
          "Book your stay at our hotel and enjoy great amenities and services",
        metaTagKeywords: ["hotel, travel, vacation"],
        title: "Book Your Stay at Our Hotel",
      },
      updatedAt: "2023-03-06T00:00:00Z",
      contact: {
        address: "address",
        city: "city",
        country: "country",
        email: "email",
        phone: "1345",
        state: "state",
      },
      owner: {
        email: "email",
        firstName: "first",
        // id: "id",
        lastName: "last",
        verified: true,
        photo: "photo",
      },
      workingHours: {
        id: "",
        weekdays: {
          fr: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
          mo: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
          sa: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
          su: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
          th: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
          tu: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
          we: {
            periods: [
              new Date().toString(),
              new Date(
                new Date().setHours(new Date().getHours() + random(5, 11))
              ).toString(),
            ],
          },
        },
      },
    };

    return data;
  });
};
