import { useQuery } from "react-query";
import { newsfeedPosts } from "ui";

export const useGetNewsFeedPostQuery = (id?: string) => {
  return useQuery(
    ["newsFeedPostDetails", { id }],
    async ({ queryKey }: any) => {
      const id = queryKey[1].id;
      if (!id) throw new Error("error getting postId");
      const post = newsfeedPosts.findIndex((post) => post.postInfo.id === id);
      if (post < 0) throw new Error("post not found");

      return newsfeedPosts[post];
    },
    {
      enabled: !!id,
    }
  );
};
