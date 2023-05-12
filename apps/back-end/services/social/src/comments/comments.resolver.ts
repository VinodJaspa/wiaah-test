import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import {
  Comment,
  CommentsCursorPaginationResponse,
  PaginationCommentsResponse,
} from '@entities';
import { CreateCommentInput, UpdateCommentInput } from '@input';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { QueryBus } from '@nestjs/cqrs';
import { GetCommentsByContentId } from './queries';
import { GetContentCommentsInput } from './dto';
import { PrismaService } from 'prismaService';
import { ContentHostType } from 'prismaClient';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly queryBus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commentsService.createComment(createCommentInput, user.id);
  }

  @Query(() => PaginationCommentsResponse)
  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commentsService.updateComment(updateCommentInput, user.id);
  }
  @Mutation(() => Comment)
  removeComment(
    @Args('id', { type: () => Int }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commentsService.deleteComment(id, user.id);
  }

  @Query(() => CommentsCursorPaginationResponse)
  getContentComments(
    @Args('getContentCommentsArgs') args: GetContentCommentsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<CommentsCursorPaginationResponse> {
    return this.queryBus.execute<
      GetCommentsByContentId,
      CommentsCursorPaginationResponse
    >(new GetCommentsByContentId(args.id, user.id, args.cursor, args.take));
  }

  @Query(() => Int)
  async getContentCommentsCount(
    @Args('id') id: string,
    @Args('type', { type: () => ContentHostType }) type: ContentHostType,
  ): Promise<number> {
    let count = 0;

    switch (type) {
      case ContentHostType.post_newsfeed:
        const post = await this.prisma.newsfeedPost.findUnique({
          where: {
            id,
          },
        });

        if (post) {
          count = post.comments;
        }
        break;
      case ContentHostType.action:
        const action = await this.prisma.action.findUnique({
          where: {
            id,
          },
        });
        if (action) {
          count = action.comments;
        }
        break;

      case ContentHostType.story:
        const story = await this.prisma.action.findUnique({
          where: {
            id,
          },
        });
        if (story) {
          count = story.comments;
        }
        break;
      case ContentHostType.post_shop:
        const shopPost = await this.prisma.productPost.findUnique({
          where: {
            id,
          },
        });
        if (shopPost) {
          count = shopPost.comments;
        }
        break;
      case ContentHostType.post_service:
        const servicePost = await this.prisma.servicePost.findUnique({
          where: {
            id,
          },
        });
        if (servicePost) {
          count = servicePost.comments;
        }
        break;
      default:
        break;
    }

    return count;
  }
}
