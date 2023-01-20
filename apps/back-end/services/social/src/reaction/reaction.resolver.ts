import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ReactionService } from './reaction.service';
import { ContentReaction } from '@entities';
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

  @Mutation(() => Boolean)
  async createReaction(
    @Args('CreateReactionInput') args: CreateReactionInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<boolean> {
    try {
      await this.reactionService.createReaction(args, user.id);
      return true;
    } catch (error) {
      console.log('error reaction', error);
      return false;
    }
  }

  @Mutation(() => ContentReaction)
  async removeReaction(
    @Args('removeReactionArgs') args: RemoveReactionInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.reactionService.removeReaction(args, user.id);
  }
}
