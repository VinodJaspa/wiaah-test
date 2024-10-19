import {
  Exact,
  UpdateProductAttributeInput,
} from "../../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminUpdateProductAttributeMutationVariables = Exact<{
  args: UpdateProductAttributeInput;
}>;

export type AdminUpdateProductAttributeMutation = {
  __typename?: "Mutation";
  updateAttribute: boolean;
};

export const useAdminUpdateProductAttributeMutation = () =>
  useMutation<
    AdminUpdateProductAttributeMutation["updateAttribute"],
    any,
    AdminUpdateProductAttributeMutationVariables["args"]
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
      .setVariables<AdminUpdateProductAttributeMutationVariables>({ args })
      .send<AdminUpdateProductAttributeMutation>();

    return res.data.updateAttribute;
  });
