import { Module } from '@nestjs/common';
import { UsersInteractionsResolver } from './users-interactions.resolver';
import { UsersInteractionsController } from './users-interactions.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { analyticsCommandHandlers } from './commands';
import { UsersInteractionsRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    UsersInteractionsResolver,
    UsersInteractionsRepository,
    ...analyticsCommandHandlers,
  ],
  controllers: [UsersInteractionsController],
})
export class UsersInteractionsModule { }
