import { useMutation, useQueryClient } from "react-query";
import { createGraphqlRequestClient } from "api";



export type CreateSavesCollectionMutationVariables = {
  name: string;
};

export type CreateSavesCollectionMutation = {
  createSavesCollection: boolean;
};

export const createSavesCollectionFetcher = async (
  variables: CreateSavesCollectionMutationVariables
) => {
  const client = createGraphqlRequestClient();

  const mutation = `
    mutation createSavesCollection($name: String!) {
      createSavesCollection(name: $name)
    }
  `;

  const res = await client.request<CreateSavesCollectionMutation, CreateSavesCollectionMutationVariables>(
    mutation,
    variables
  );

  return res.createSavesCollection;
};


export const useCreateSavesCollection = () => {
  const queryClient = useQueryClient();

  return useMutation(createSavesCollectionFetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries("user-saves-collections");
    },
  });
};

  