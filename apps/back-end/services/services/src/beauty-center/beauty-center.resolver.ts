import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GetLang,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlSelectedFields,
  GqlSelectedQueryFields,
  UserPreferedLang,
} from 'nest-utils';

import { BeautyCenterService } from './beauty-center.service';
import { BeautyCenter } from './entities/beauty-center.entity';
import { CreateBeautyCenterInput } from './dto/create-beauty-center.input';
import { UpdateBeautyCenterInput } from './dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetBeautyCenterByIdQuery } from './queries/impl/get-beauty-center-by-id.query';

export type GqlBeautyCenterSelectedFields = GqlSelectedFields<BeautyCenter>;

@Resolver(() => BeautyCenter)
export class BeautyCenterResolver {
  constructor(
    private readonly beautyCenterService: BeautyCenterService,
    private readonly queryBus: QueryBus,
  ) {}

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

  @Mutation(() => BeautyCenter)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  async deleteBeautyCenter(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GqlSelectedQueryFields() fields: GqlBeautyCenterSelectedFields,
  ): Promise<BeautyCenter> {
    return this.beautyCenterService.deleteBeautyCenter(id, user.id, fields);
  }

  @ResolveReference()
  resloveRef(
    ref: { __typename: string; id: string },
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GetLang() langId: UserPreferedLang,
    @GqlSelectedQueryFields() fields: GqlBeautyCenterSelectedFields,
  ): Promise<BeautyCenter> {
    return this.queryBus.execute<GetBeautyCenterByIdQuery>(
      new GetBeautyCenterByIdQuery({
        id: ref.id,
        langId,
        selectedFields: fields,
        userId: user.id,
      }),
    );
  }
}
