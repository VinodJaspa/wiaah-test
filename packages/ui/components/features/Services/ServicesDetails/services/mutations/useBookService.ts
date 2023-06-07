import { createGraphqlRequestClient } from "api";
import { BookServiceInput, BookedService, Exact } from "@features/API";
import { useMutation } from "react-query";

export type BookServiceMutationVariables = Exact<{
  args: BookServiceInput;
}>;

export type BookServiceMutation = { __typename?: "Mutation" } & {
  BookService: { __typename?: "BookedService" } & Pick<BookedService, "id">;
};

export const useBookServiceMutation = () =>
  useMutation<
    BookServiceMutation["BookService"],
    any,
    BookServiceMutationVariables["args"]
  >(["book-service"], async (args) => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
mutation BookService($args:BookServiceInput!){
  BookService(args:$args){
    id
  }
}
    `
      )
      .setVariables<BookServiceMutationVariables>({
        args,
      })
      .send<BookServiceMutation>();

    return res.data.BookService;
  });
