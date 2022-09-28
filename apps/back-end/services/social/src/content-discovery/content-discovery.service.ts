import { CommentsService } from '@comments';
import { Comment, NewsfeedPost } from '@entities';
import { ContentNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { NewsfeedPostsService } from '@posts-newsfeed';
import { ContentHostType } from 'prismaClient';
import { PrismaService } from 'prismaService';

type ContentData = Comment | NewsfeedPost;

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
}
