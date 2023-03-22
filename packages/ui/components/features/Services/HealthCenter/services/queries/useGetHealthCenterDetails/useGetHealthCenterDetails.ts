import {
  Doctor,
  Account,
  ServicePresentationType,
  ServicePaymentMethod,
  ServiceStatus,
  HealthCenterDoctorAvailablityStatus,
} from "@features/API";
import { AsyncReturnType } from "@UI/../types/src";
import {
  Exact,
  HealthCenter,
  HealthCenterSpecialty,
  Maybe,
  Scalars,
  ServiceCancelationPolicy,
  ServiceContact,
  ServiceDayWorkingHours,
  ServiceLocation,
  ServiceMetaInfo,
  ServicePolicy,
  ServicePresentation,
  WorkingSchedule,
} from "@features/API";
import { useQuery } from "react-query";
import { createGraphqlRequestClient } from "@UI/../api";
import { random } from "lodash";

export type GetHealthCenterQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetHealthCenterQuery = { __typename?: "Query" } & {
  getHealthCenter: { __typename?: "HealthCenter" } & Pick<
    HealthCenter,
    | "id"
    | "ownerId"
    | "payment_methods"
    | "rating"
    | "status"
    | "totalReviews"
    | "vat"
  > & {
      cancelationPolicies: Array<
        { __typename?: "ServiceCancelationPolicy" } & Pick<
          ServiceCancelationPolicy,
          "cost" | "duration"
        >
      >;
      contact: { __typename?: "ServiceContact" } & Pick<
        ServiceContact,
        "address" | "city" | "country" | "email" | "phone" | "state"
      >;
      doctors: Array<
        { __typename?: "Doctor" } & Pick<
          Doctor,
          | "availablityStatus"
          | "description"
          | "healthCenterId"
          | "id"
          | "name"
          | "price"
          | "rating"
          | "specialityId"
          | "thumbnail"
        > & {
            speciality?: Maybe<
              { __typename?: "HealthCenterSpecialty" } & Pick<
                HealthCenterSpecialty,
                "description" | "id" | "name"
              >
            >;
          }
      >;
      location: { __typename?: "ServiceLocation" } & Pick<
        ServiceLocation,
        "address" | "city" | "country" | "lat" | "lon" | "postalCode" | "state"
      >;
      owner?: Maybe<
        { __typename?: "Account" } & Pick<
          Account,
          "id" | "firstName" | "lastName" | "email" | "photo" | "verified"
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
      workingHours: { __typename?: "WorkingSchedule" } & Pick<
        WorkingSchedule,
        "id"
      > & {
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
        };
    };
};

export const getHealthCenterDetailsQueryKey = (filters: { id: string }) => [
  "healthCenterDetails",
  { filters },
];

export const useGetHealthCenterDetailsQuery = (id: string) => {
  return useQuery(getHealthCenterDetailsQueryKey({ id }), async () => {
    const client = createGraphqlRequestClient();

    client.setQuery(
      `
    query getHealthCenter($id:String!){
    getHealthCenter(
        serviceId:$id
    ){
        cancelationPolicies {
            cost
            duration
        }
        contact{
            address
            city
            country
            email
            phone
            state
        }
        doctors{
            availablityStatus
            description
            healthCenterId
            id
            name
            price
            rating
            speciality{
                description
                id
                name
            }
            specialityId
            thumbnail
        }
        id
        location {
            address
            city
            country
            lat
            lon
            postalCode
            state
        }
        ownerId
        owner{
            id
            firstName
            lastName
            email
            photo
            verified
        }
        payment_methods
        policies {
            policyTitle
            terms
        }
        presentations {
            src
            type
        }
        rating
        serviceMetaInfo{
            description
            hashtags
            metaTagDescription
            metaTagKeywords
            title
        }
        status
        totalReviews
        vat
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
    }   }
}
    `
    );

    const data: GetHealthCenterQuery["getHealthCenter"] = {
      // createdAt: "2023-03-06T00:00:00Z",
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
      rating: 15,
      status: ServiceStatus.Active,
      totalReviews: 153,
      vat: 12,
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

      doctors: [
        {
          availablityStatus: HealthCenterDoctorAvailablityStatus.Available,
          description: "eye doctor description",
          healthCenterId: "",
          id: "",
          name: "doctor name",
          price: 150,
          rating: 5,
          specialityId: "",
          thumbnail:
            "https://cdn.sanity.io/images/0vv8moc6/diag_imaging/299673abf1f3d5e6c1e45cf05eff17274c935008-940x788.png?fit=crop&auto=format",
          speciality: { description: "eyes", id: "", name: "eye" },
        },
        {
          availablityStatus: HealthCenterDoctorAvailablityStatus.Available,
          description: "eye doctor description",
          healthCenterId: "",
          id: "",
          name: "doctor name",
          price: 150,
          rating: 5,
          specialityId: "",
          thumbnail:
            "https://cdn.sanity.io/images/0vv8moc6/diag_imaging/299673abf1f3d5e6c1e45cf05eff17274c935008-940x788.png?fit=crop&auto=format",
          speciality: { description: "eyes", id: "", name: "eye" },
        },
        {
          availablityStatus: HealthCenterDoctorAvailablityStatus.Available,
          description: "eye doctor description",
          healthCenterId: "",
          id: "",
          name: "doctor name",
          price: 150,
          rating: 5,
          specialityId: "",
          thumbnail:
            "https://cdn.sanity.io/images/0vv8moc6/diag_imaging/299673abf1f3d5e6c1e45cf05eff17274c935008-940x788.png?fit=crop&auto=format",
          speciality: { description: "eyes", id: "", name: "eye" },
        },
      ],
      serviceMetaInfo: {
        description: "A great hotel in a prime location",
        hashtags: ["#travel", "#vacation", "#hotel"],
        metaTagDescription:
          "Book your stay at our hotel and enjoy great amenities and services",
        metaTagKeywords: ["hotel, travel, vacation"],
        title: "Book Your Stay at Our Hotel",
      },
      // updatedAt: "2023-03-06T00:00:00Z",
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
        id: "id",
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

    const res = await client
      .setVariables<GetHealthCenterQueryVariables>({
        id,
      })
      .send<GetHealthCenterQuery>();

    res.data.getHealthCenter;
  });
};
