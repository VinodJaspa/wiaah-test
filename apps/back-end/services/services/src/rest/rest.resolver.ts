import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RestService } from './rest.service';
import { Rest } from './entities/rest.entity';
import { CreateRestInput } from './dto/create-rest.input';
import { UpdateRestInput } from './dto/update-rest.input';

@Resolver(() => Rest)
export class RestResolver {
  constructor(private readonly restService: RestService) {}

  @Mutation(() => Rest)
  createRest(@Args('createRestInput') createRestInput: CreateRestInput) {
    return this.restService.create(createRestInput);
  }

  @Query(() => [Rest], { name: 'rest' })
  findAll() {
    return this.restService.findAll();
  }

  @Query(() => Rest, { name: 'rest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.restService.findOne(id);
  }

  @Mutation(() => Rest)
  updateRest(@Args('updateRestInput') updateRestInput: UpdateRestInput) {
    return this.restService.update(updateRestInput.id, updateRestInput);
  }

  @Mutation(() => Rest)
  removeRest(@Args('id', { type: () => Int }) id: number) {
    return this.restService.remove(id);
  }
}
