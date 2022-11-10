import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserMembershipService } from './user-membership.service';
import { UserMembership } from './entities/user-membership.entity';
import { CreateUserMembershipInput } from './dto/create-user-membership.input';
import { UpdateUserMembershipInput } from './dto/update-user-membership.input';

@Resolver(() => UserMembership)
export class UserMembershipResolver {
  constructor(private readonly userMembershipService: UserMembershipService) {}

  @Mutation(() => UserMembership)
  createUserMembership(@Args('createUserMembershipInput') createUserMembershipInput: CreateUserMembershipInput) {
    return this.userMembershipService.create(createUserMembershipInput);
  }

  @Query(() => [UserMembership], { name: 'userMembership' })
  findAll() {
    return this.userMembershipService.findAll();
  }

  @Query(() => UserMembership, { name: 'userMembership' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userMembershipService.findOne(id);
  }

  @Mutation(() => UserMembership)
  updateUserMembership(@Args('updateUserMembershipInput') updateUserMembershipInput: UpdateUserMembershipInput) {
    return this.userMembershipService.update(updateUserMembershipInput.id, updateUserMembershipInput);
  }

  @Mutation(() => UserMembership)
  removeUserMembership(@Args('id', { type: () => Int }) id: number) {
    return this.userMembershipService.remove(id);
  }
}
