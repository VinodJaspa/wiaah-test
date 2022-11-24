import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ActionResolver } from './action.resolver';
import { ActionController } from './action.controller';

@Module({
  imports: [CqrsModule],
  providers: [ActionResolver],
  controllers: [ActionController],
})
export class ActionModule {}
