import {
  BillingAccount,
  PartialBillingAccountAddress,
  BillingAccountIndividual,
  BillingAccountAddress,
  BillingAccountDateOfBirth,
  CompanyPerson,
  PartialBillingAccountDateOfBirth,
  PartialCompanyPersonRelationship,
  Maybe,
  Exact,
  CreateCompanyPersonRelationshipInput,
} from "@features/API";
import { isDev } from "@UI/../utils/src";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyPayoutAccountQueryVariables = Exact<{ [key: string]: never }>;

type PartialBillingAccountCompany = {
  name: string;
  phone: string;
  tax_id: string;
};

type PartialBillingAccountBusinessProfile = {
  name: string;
  mcc: string;
  url: string;
};

export type GetMyPayoutAccountQuery = { __typename?: "Query" } & {
  getMyBillingAccount: { __typename?: "BillingAccount" } & Pick<
    BillingAccount,
    "businessType"
  > & {
    business_profile?: Maybe<
      { __typename?: "PartialBillingAccountBusinessProfile" } & Pick<
        PartialBillingAccountBusinessProfile,
        "mcc" | "name" | "url"
      >
    >;
    company?: Maybe<
      { __typename?: "PartialBillingAccountCompany" } & Pick<
        PartialBillingAccountCompany,
        "name" | "phone" | "tax_id"
      > & {
        address: { __typename?: "PartialBillingAccountAddress" } & Pick<
          PartialBillingAccountAddress,
          "city" | "country" | "line1" | "postal_code" | "state"
        >;
      }
    >;
    individual?: Maybe<
      { __typename?: "BillingAccountIndividual" } & Pick<
        BillingAccountIndividual,
        | "email"
        | "phone"
        | "first_name"
        | "last_name"
        | "id_number"
        | "ssn_last_4"
      > & {
        address: { __typename?: "BillingAccountAddress" } & Pick<
          BillingAccountAddress,
          "city" | "country" | "line1" | "postal_code" | "state"
        >;
        dob: { __typename?: "BillingAccountDateOfBirth" } & Pick<
          BillingAccountDateOfBirth,
          "day" | "month" | "year"
        >;
      }
    >;
    companyMembers?: Maybe<
      Array<
        { __typename?: "CompanyPerson" } & Pick<
          CompanyPerson,
          "email" | "first_name" | "id" | "id_number" | "last_name" | "phone"
        > & {
          address: { __typename?: "PartialBillingAccountAddress" } & Pick<
            PartialBillingAccountAddress,
            "city" | "country" | "line1" | "postal_code" | "state"
          >;
          dob: { __typename?: "PartialBillingAccountDateOfBirth" } & Pick<
            PartialBillingAccountDateOfBirth,
            "day" | "month" | "year"
          >;
          relationship: {
            __typename?: "PartialCompanyPersonRelationship";
          } & Pick<
            CreateCompanyPersonRelationshipInput,
            "director" | "executive" | "owner" | "representative" | "title"
          >;
        }
      >
    >;
  };
};

export const useGetMyPayoutAccountQuery = () =>
  useQuery("my-active-payout-account", async () => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
query getMyPayoutAccount{
    getMyBillingAccount{
        business_profile{
            mcc
            name
            url
        }
        businessType
        company{
            address{
                city
                country
                line1
                postal_code
            }
            name
            phone
            tax_id
        }
        individual{
            address{
                city
                country
                line1
                postal_code
                state
            }
            dob{
                day
                month
                year
            }
            email
            phone
          first_name
          last_name
          id_number
            ssn_last_4
        }
        companyMembers{
            address{
                city
                country
                line1
                postal_code
                state
            }
            dob{
                day
                month
                year
            }
            email
            first_name
            id
            id_number
            last_name
            phone
            relationship{
                director
                executive
                owner
                representative
                title
            }
        }
    }
}
        `
      )
      .setVariables<GetMyPayoutAccountQueryVariables>({})
      .send<GetMyPayoutAccountQuery>();
    return res.data.getMyBillingAccount;
  });
