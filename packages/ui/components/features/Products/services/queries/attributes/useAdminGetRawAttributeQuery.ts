import {
  Exact,
  ProductAttributeDisplayType,
  ProductAttributeSelectionType,
} from "../../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetAdminRawProductAttributeQueryVariables = Exact<{
  id: string;
}>;

export type GetAdminRawProductAttributeQuery = {
  __typename?: "Query";
  getRawAttribute: {
    __typename?: "ProductRawAttribute";
    id: string;
    displayType: ProductAttributeDisplayType;
    selectionType: ProductAttributeSelectionType;
    name: Array<{
      __typename?: "TranslationText";
      langId: string;
      value: string;
    }>;
    values: Array<{
      __typename?: "ProductRawAttributeValue";
      value: string;
      name: Array<{
        __typename?: "TranslationText";
        langId: string;
        value: string;
      }>;
    }>;
  };
};

type args = GetAdminRawProductAttributeQueryVariables;
export const useAdminGetRawProductAttributeQuery = (args: args) =>
  useQuery(["admin-raw-product-attribute", { args }], async () => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
query getAdminRawProductAttribute(
    $id:String!
){
    getRawAttribute(
        id:$id
    ){
        id
        displayType
        name{
            langId
            value
        }
        selectionType
        values{
            name{
                langId
                value
            }
            value
        }
    }
}
    `,
      )
      .setVariables<GetAdminRawProductAttributeQueryVariables>(args)
      .send<GetAdminRawProductAttributeQuery>();

    return res.data.getRawAttribute;
  });
