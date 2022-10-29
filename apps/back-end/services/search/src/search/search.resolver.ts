import { Resolver, Query, Args } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import {
  AuthorizationDecodedUser,
  GetLang,
  GqlCurrentUser,
  GqlSelectedFields,
  GqlSelectedQueryFields,
  UserPreferedLang,
} from 'nest-utils';

import { Localization } from './entities';
import { GetLocalizationInput } from './dto';
import { SearchLocalizationCommand } from './commands';

@Resolver(() => Localization)
export class SearchResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Query(() => Localization)
  getLocalisation(
    @Args('getLocalisationInput') input: GetLocalizationInput,
    @GetLang() langId: UserPreferedLang,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GqlSelectedQueryFields() fields: GqlSelectedFields,
  ) {
    console.log('test');
    return this.commandBus.execute<SearchLocalizationCommand>(
      new SearchLocalizationCommand({
        ...input,
        langId,
        userId: user.id,
        selectedFields: fields,
      }),
    );
  }
}
