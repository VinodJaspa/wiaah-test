import { Story } from "@features/Social/services/types";

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
