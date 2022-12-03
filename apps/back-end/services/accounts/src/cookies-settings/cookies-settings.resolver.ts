import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CookiesSetting } from './entities/cookies-setting.entity';
import { CreateCookiesSettingInput } from './dto/create-cookies-setting.input';
import { UpdateCookiesSettingInput } from './dto/update-cookies-setting.input';
import { CommandBus } from '@nestjs/cqrs';

@Resolver(() => CookiesSetting)
export class CookiesSettingsResolver {
  constructor(private readonly commandBus: CommandBus) {}
}
