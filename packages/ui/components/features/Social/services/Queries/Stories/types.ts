import { Story } from "@features/API";

export type SharedStoryResponse = { __typename?: "Story" } & Pick<
  Story,
  | "id"
  | "content"
  | "createdAt"
  | "publisherId"
  | "reactionsNum"
  | "type"
  | "updatedAt"
  | "viewsCount"
>;
