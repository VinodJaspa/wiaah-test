import {
  CreateProductAttributeInput,
  Exact,
} from "../../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminCreateProductAttributeMutationVariables = Exact<{
  args: CreateProductAttributeInput;
}>;

export type AdminCreateProductAttributeMutation = {
  __typename?: "Mutation";
  createAttribute: boolean;
};

export const useAdminCreateProductAttributeMutation = () =>
  useMutation<
    AdminCreateProductAttributeMutation["createAttribute"],
    any,
    AdminCreateProductAttributeMutationVariables["args"]
  >(async (args) => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
mutation adminCreateProductAttribute(
    $args:CreateProductAttributeInput!
) {
    createAttribute(
        args:$args
    )
}
    `,
      )
      .setVariables<AdminCreateProductAttributeMutationVariables>({ args })
      .send<AdminCreateProductAttributeMutation>();

    return res.data.createAttribute;
  });
