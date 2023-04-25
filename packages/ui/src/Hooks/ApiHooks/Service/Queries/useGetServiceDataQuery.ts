import { isDev } from "@UI/../utils/src";
import { Exact, Maybe, Scalars, Service, ServiceType } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetServiceMetaDataQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetServiceMetaDataQuery = { __typename?: "Query" } & {
  getServiceDetails?: Maybe<
    { __typename?: "Service" } & Pick<
      Service,
      | "id"
      | "depositAmount"
      | "deposit"
      | "type"
      | "name"
      | "thumbnail"
      | "bathrooms"
      | "beds"
      | "num_of_rooms"
    >
  >;
};

type args = GetServiceMetaDataQueryVariables;

export const getServiceMetadataQueryFetcher = async (args: args) => {
  if (isDev) {
    const mockRes: GetServiceMetaDataQuery["getServiceDetails"] = {
      id: "",
      name: "Range Rover Evoque - 2021",
      thumbnail:
        "https://hips.hearstapps.com/hmg-prod/images/2023-mclaren-artura-101-1655218102.jpg?crop=1.00xw:0.847xh;0,0.153xh&resize=1200:*",
      type: ServiceType.Hotel,
      deposit: true,
      depositAmount: 20,
      num_of_rooms: 4,
      bathrooms: 3,
      beds: 4,
    };
    return mockRes;
  }

  const client = createGraphqlRequestClient();
  const res = await client
    .setQuery(
      `
query getServiceMetaData($id:String!){
  getServiceDetails(id:$id,isClick:false){
    id
    depositAmount
    deposit
    type
    name
    thumbnail
    num_of_rooms
    beds
    bathrooms
  }
}
  `
    )
    .setVariables<GetServiceMetaDataQueryVariables>(args)
    .send<GetServiceMetaDataQuery>();

  return res.data.getServiceDetails;
};

export const useGetServiceMetadataQuery = (args: args) => {
  console.log({ args });
  return useQuery(["service-metadata", args], () =>
    getServiceMetadataQueryFetcher(args)
  );
};
