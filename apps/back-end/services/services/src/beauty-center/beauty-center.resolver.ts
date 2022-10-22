import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BeautyCenterService } from './beauty-center.service';
import { BeautyCenter } from './entities/beauty-center.entity';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlSelectedFields,
  GqlSelectedQueryFields,
} from 'nest-utils';
import { CreateBeautyCenterInput } from './dto/create-beauty-center.input';
import { UseGuards } from '@nestjs/common';
import { UpdateBeautyCenterInput } from './dto';

export type GqlBeautyCenterSelectedFields = GqlSelectedFields<BeautyCenter>;

@Resolver(() => BeautyCenter)
export class BeautyCenterResolver {
  constructor(private readonly beautyCenterService: BeautyCenterService) {}

  @Mutation(() => BeautyCenter)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  async createBeautyCenter(
    @Args('createBeautyCenterArgs') args: CreateBeautyCenterInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GqlSelectedQueryFields({ rootFieldName: 'createBeautyCenter' })
    fields: GqlBeautyCenterSelectedFields,
  ) {
    return this.beautyCenterService.createBeautyCenter(args, user.id, fields);
  }

  @Mutation(() => BeautyCenter)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  async updateBeautyCenter(
    @Args('updateBeautyCenter') input: UpdateBeautyCenterInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GqlSelectedQueryFields()
    fields: GqlBeautyCenterSelectedFields,
  ) {
    return this.beautyCenterService.updateBeautyCenter(input, user.id, fields);
  }

  @Query(() => BeautyCenter)
  async getBeautyCenterById(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GqlSelectedQueryFields()
    fields: GqlBeautyCenterSelectedFields,
  ) {
    return this.beautyCenterService.getBeautyCenterById(id, user?.id, fields);
  }
}
