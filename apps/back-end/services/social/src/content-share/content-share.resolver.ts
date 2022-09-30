import { ContentShare, ContentSharePaginationResponse } from '@entities';
import { CreateContentShareInput } from '@input';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { ContentShareService } from './content-share.service';

@Resolver(() => ContentShare)
@UseGuards(new GqlAuthorizationGuard([]))
export class ContentShareResolver {
  constructor(private readonly contentShareService: ContentShareService) {}

  @Mutation(() => ContentShare)
  shareContent(
    @Args('createContentShareInput')
    createContentShareInput: CreateContentShareInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.contentShareService.createShare(
      createContentShareInput,
      user.id,
    );
  }

  @Query(() => ContentSharePaginationResponse)
  getAllShares() {
    return this.contentShareService.findAll();
  }
}
