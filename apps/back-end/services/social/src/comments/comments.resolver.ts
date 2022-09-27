import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment, PaginationCommentsResponse } from '@entities';
import { CreateCommentInput } from '@input';
import { UpdateCommentInput } from '@input';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

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
}
