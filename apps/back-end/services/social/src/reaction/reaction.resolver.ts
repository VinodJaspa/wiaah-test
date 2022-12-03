import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReactionService } from './reaction.service';
import { ContentReaction, ContentReactionResponse } from '@entities';
import { CreateReactionInput, RemoveReactionInput } from '@input';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';

@Resolver(() => ContentReaction)
@UseGuards(new GqlAuthorizationGuard([]))
export class ReactionResolver {
  constructor(private readonly reactionService: ReactionService) {}

  @Mutation(() => ContentReactionResponse)
  async createReaction(
    @Args('CreateReactionInput') args: CreateReactionInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ContentReactionResponse> {
    return { data: await this.reactionService.createReaction(args, user.id) };
  }

  @Mutation(() => ContentReaction)
  async removeReaction(
    @Args('removeReactionArgs') args: RemoveReactionInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.reactionService.removeReaction(args, user.id);
  }
}
