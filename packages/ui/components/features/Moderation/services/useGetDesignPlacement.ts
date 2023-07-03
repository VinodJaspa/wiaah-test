import { getRandomImage } from "@UI/placeholder";
import { DesignType, Exact, GetDesignByPlacementInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { isDev } from "utils";

export type GetDesignByPlacementQueryVariables = Exact<{
  args: GetDesignByPlacementInput;
}>;

export type GetDesignByPlacementQuery = {
  __typename?: "Query";
  getDesignByPlacement: Array<{
    __typename?: "Design";
    id: string;
    src: string;
    type: DesignType;
    distenation: string;
    name: string;
    text: string;
  }>;
};

type args = GetDesignByPlacementQueryVariables["args"];

export const getDesignPlacementQueryKey = (args: args) => [
  "get-design-placement",
  { args },
];

export const getDesignPlacementQueryFetcher = async (args: args) => {
  if (isDev) {
    const res: GetDesignByPlacementQuery["getDesignByPlacement"] = [
      ...Array(5),
    ].map((_, i) => ({
      distenation: "",
      id: i.toString(),
      name: i.toString(),
      src: getRandomImage(),
      text: "test ",
      type: DesignType.Slideshow,
    }));

    return res;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `query getDesignByPlacement(
    $args:GetDesignByPlacementInput!
){
    getDesignByPlacement(
        args:$args
    ){
        id
        src
        type
        id
        distenation
        name
        text
    }
}`
    )
    .setVariables<GetDesignByPlacementQueryVariables>({ args })
    .send<GetDesignByPlacementQuery>();

  return res.data.getDesignByPlacement;
};

export const useGetDesignPlacementQuery = (args: args) =>
  useQuery(getDesignPlacementQueryKey(args), () =>
    getDesignPlacementQueryFetcher(args)
  );
