import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MangerService } from './manager.service';
import { Notification } from '@entities';
import { UseGuards } from '@nestjs/common';
import { GqlAuthorizationGuard } from 'nest-utils';

@Resolver(() => Notification)
@UseGuards(new GqlAuthorizationGuard([]))
export class MangerResolver {
  constructor(private readonly mangerService: MangerService) {}
}
