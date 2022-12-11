import { CreateRestaurantInput } from './create-restaurant.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field(() => ID)
  id: string;
}
@InputType()
export class UpdateRestaurantAdminInput extends PartialType(
  CreateRestaurantInput,
) {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;
}
