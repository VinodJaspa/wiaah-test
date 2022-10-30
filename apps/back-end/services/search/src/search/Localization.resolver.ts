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
import { SearchLocalizationCommand, SearchPlacesCommand } from './commands';
import { GqlLocalizationSelectedFields } from './types/GqlSelectedFields';

@Resolver(() => Localization)
export class LocalizationResolver {
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

  @Query(() => Localization)
  getPlaces(
    @Args('placeQuery') query: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GetLang() langId: string,
    @GqlSelectedQueryFields() fields: GqlLocalizationSelectedFields,
  ) {
    console.log('places');
    return this.commandBus.execute<SearchPlacesCommand>(
      new SearchPlacesCommand({
        langId,
        query,
        selectedFields: fields,
      }),
    );
  }
}
