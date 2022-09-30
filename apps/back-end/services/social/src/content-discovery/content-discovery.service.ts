import { CommentsService } from '@comments';
import { Comment, NewsfeedPost } from '@entities';
import { ContentNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { NewsfeedPostsService } from '@posts-newsfeed';
import { ContentHostType, PostType } from 'prismaClient';

export type ContentData = Comment | NewsfeedPost;

@Injectable()
export class ContentDiscoveryService {
  constructor(
    private readonly newsfeedPostsService: NewsfeedPostsService,
    private readonly commentsService: CommentsService,
  ) {}

  async getContent(
    type: ContentHostType,
    contentId: string,
  ): Promise<ContentData> {
    switch (type) {
      case 'post_newsfeed':
        return this.newsfeedPostsService.getNewsfeedPostById(contentId);
      case 'comment':
        return this.commentsService.getCommentById(contentId);

      default:
        throw new ContentNotFoundException();
    }
  }

  async getManyPosts(
    contents: { type: PostType; contentId: string }[],
  ): Promise<ContentData[]> {
    const organisedContentData = contents.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.type]: [...(acc[curr.type] || []), curr.contentId],
      };
    }, {} as Record<PostType, string[]>);

    const postsData: ContentData[] = [];

    for (const _type in organisedContentData) {
      const type = _type as PostType;
      switch (type) {
        case 'newsfeed_post':
          const posts = await this.newsfeedPostsService.getNewsfeedPostsById(
            organisedContentData[type] || [],
          );
          postsData.concat(posts);
          break;

        default:
          break;
      }
    }

    return postsData;
  }
}
