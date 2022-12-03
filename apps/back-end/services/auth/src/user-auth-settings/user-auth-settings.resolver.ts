import { Resolver } from '@nestjs/graphql';
import { UserAuthSetting } from './entities/user-auth-setting.entity';
import { CommandBus } from '@nestjs/cqrs';

@Resolver(() => UserAuthSetting)
export class UserAuthSettingsResolver {
  constructor(private readonly commandbus: CommandBus) {}
}
