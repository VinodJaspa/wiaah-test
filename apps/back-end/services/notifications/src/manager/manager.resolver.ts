import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ManagerService } from './manager.service';
import {
  NotificationPaginationResponse,
  Notification,
  Profile,
} from '@entities';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';

@Resolver(() => Notification)
@UseGuards(new GqlAuthorizationGuard([]))
export class ManagerResolver {
  constructor(private readonly managerService: ManagerService) {}

  @Query(() => NotificationPaginationResponse)
  getMyNotifications(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.managerService.getMyNotifications(user.id);
  }

  @ResolveField(() => Profile)
  User(@Parent() notification: Notification) {
    return { __typename: 'User', id: notification.authorProfileId };
  }
}
