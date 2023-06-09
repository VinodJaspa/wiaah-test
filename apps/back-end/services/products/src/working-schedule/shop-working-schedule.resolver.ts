import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ShopWorkingSchedule } from './entities';

@Resolver(() => ShopWorkingSchedule)
export class ShopWorkingScheduleResolver {
  @ResolveField(() => Boolean)
  isOpen(@Parent() schdule: ShopWorkingSchedule) {
    // TODO: get is open
    return true;
  }

  @ResolveField(() => String)
  openFrom(@Parent() schedule: ShopWorkingSchedule) {
    // TODO:
    return new Date().toString();
  }

  @ResolveField(() => String)
  openTo(@Parent() schedule: ShopWorkingSchedule) {
    // TODO:
    return new Date().toString();
  }
}
