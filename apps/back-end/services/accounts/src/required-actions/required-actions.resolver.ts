import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RequiredActionsService } from './required-actions.service';
import { RequiredAction } from './entities/required-action.entity';
import { CreateRequiredActionInput } from './dto/create-required-action.input';
import { UpdateRequiredActionInput } from './dto/update-required-action.input';

@Resolver(() => RequiredAction)
export class RequiredActionsResolver {
  constructor(private readonly requiredActionsService: RequiredActionsService) {}

  @Mutation(() => RequiredAction)
  createRequiredAction(@Args('createRequiredActionInput') createRequiredActionInput: CreateRequiredActionInput) {
    return this.requiredActionsService.create(createRequiredActionInput);
  }

  @Query(() => [RequiredAction], { name: 'requiredActions' })
  findAll() {
    return this.requiredActionsService.findAll();
  }

  @Query(() => RequiredAction, { name: 'requiredAction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.requiredActionsService.findOne(id);
  }

  @Mutation(() => RequiredAction)
  updateRequiredAction(@Args('updateRequiredActionInput') updateRequiredActionInput: UpdateRequiredActionInput) {
    return this.requiredActionsService.update(updateRequiredActionInput.id, updateRequiredActionInput);
  }

  @Mutation(() => RequiredAction)
  removeRequiredAction(@Args('id', { type: () => Int }) id: number) {
    return this.requiredActionsService.remove(id);
  }
}
