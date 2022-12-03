import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ActionResolver } from './action.resolver';
import { ActionController } from './action.controller';
import { ActionCommandHandlers } from './commands';
import { ActionQueryHandlers } from './queries';
import { ActionRepository } from './repository';
import { ActionEventHandlers } from './events';
import { kafkaModule } from '@kafkaModule';

@Module({
  imports: [CqrsModule, kafkaModule],
  providers: [
    ActionResolver,
    ActionRepository,
    ...ActionCommandHandlers,
    ...ActionQueryHandlers,
    ...ActionEventHandlers,
  ],
  controllers: [ActionController],
})
export class ActionModule {}
