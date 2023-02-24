import {
  Attachment,
  Exact,
  GetReportsInput,
  Hashtag,
  NewsfeedPost,
  Profile,
  Report,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetPostReportsQueryVariables = Exact<{
  args: GetReportsInput;
}>;

export type AdminGetPostReportsQuery = { __typename?: "Query" } & {
  getReports: Array<
    { __typename?: "Report" } & Pick<
      Report,
      "id" | "type" | "createdAt" | "status" | "message"
    > & {
        reportedBy: { __typename?: "Profile" } & Pick<
          Profile,
          "id" | "username"
        >;
        post: { __typename?: "NewsfeedPost" } & Pick<
          NewsfeedPost,
          "title" | "content" | "reactionNum" | "shares" | "comments" | "views"
        > & {
            hashtags: Array<{ __typename?: "Hashtag" } & Pick<Hashtag, "tag">>;
            attachments: Array<
              { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
            >;
          };
      }
  >;
};

type args = AdminGetPostReportsQueryVariables["args"];
export const adminGetReportsQueryKey = (args: args) => [
  "admin-reports",
  { args },
];

export const adminGetReportsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetPostReports($args:GetReportsInput!) {
 	getReports(getReportsArgs:$args){
    id
    type
    createdAt
    status
    message
    reportedBy {
      id
      username
    }
    post {
      title
      content
      hashtags{
        tag
      }
      attachments{
        src
        type
      }
      reactionNum
      shares
      comments
      views
    }
    status
    
  } 
}
    `);

  const res = await client
    .setVariables<AdminGetPostReportsQueryVariables>({
      args,
    })
    .send<AdminGetPostReportsQuery>();

  return res.data.getReports;
};

export const useAdminGetSocialReports = (args: args) =>
  useQuery(adminGetReportsQueryKey(args), () =>
    adminGetReportsQueryFetcher(args)
  );
