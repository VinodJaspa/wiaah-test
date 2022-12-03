import { Resolver } from '@nestjs/graphql';
import { UsersInteraction } from './entities/users-interaction.entity';

@Resolver(() => UsersInteraction)
export class UsersInteractionsResolver {}
