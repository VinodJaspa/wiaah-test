import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ActionResolver } from './action.resolver';
import { ActionController } from './action.controller';
import { ActionCommandHandlers } from './commands';
import { ActionQueryHandlers } from './queries';
import { ActionRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    ActionResolver,
    ActionRepository,
    ...ActionCommandHandlers,
    ...ActionQueryHandlers,
  ],
  controllers: [ActionController],
})
export class ActionModule {}
