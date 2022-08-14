import { QueryFunctionContext } from "react-query";
import { socialAffiliationCardPlaceholders } from "ui";

export type queryKey = [string, { id: string }];

export const getAffiliationPostDetails = ({ queryKey }: any) => {
  const id = queryKey[1].id;
  if (!id) throw new Error("error getting postId");
  const post = socialAffiliationCardPlaceholders.findIndex(
    (post) => post.id === id
  );
  if (post < 0) throw new Error("post not found");

  return socialAffiliationCardPlaceholders[post];
};
