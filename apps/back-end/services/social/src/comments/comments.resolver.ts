import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment, PaginationCommentsResponse } from '@entities';
import { CreateCommentInput, UpdateCommentInput } from '@input';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { QueryBus } from '@nestjs/cqrs';
import { GetCommentsByContentId } from './queries';
import { GetContentCommentsInput } from './dto';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly queryBus: QueryBus,
  ) {}
  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commentsService.createComment(createCommentInput, user.id);
  }
  @Query(() => [Comment], { name: 'comments' })
  findAll() {
    return this.commentsService.findAll();
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

  @Query(() => [Comment])
  getContentComments(
    @Args('getContentCommentsArgs') args: GetContentCommentsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.queryBus.execute(
      new GetCommentsByContentId(args.id, user.id, args.cursor, args.take),
    );
  }
}
