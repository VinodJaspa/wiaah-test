import { CreateProductInput, Product } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";
import { errorToast, successToast } from "utils";

export const useCreateNewProductMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation create($input: CreateProductInput!) {
      createNewProduct(createNewProductInput: $input) {
        id
        title {
          value
          langId
        }
        price
        stock
      }
    }
  `);

  return useMutation<boolean, unknown, CreateProductInput>(
    async (input) => {
      try {
        const res = await client
          .setVariables({ input })
          .send<{ createNewProduct: Product }>();

        if (res?.data?.createNewProduct?.id) {
          successToast("✅ Product created successfully!");
          return true;
        } else {
          throw new Error("No product ID returned from server");
        }
      } catch (err: any) {
        const message =
          err?.response?.[0]?.message ??
          err?.message ??
          "Unknown error";
        errorToast(`❌ Failed to create product: ${message}`);
        return false;
      }
    }
  );
};
