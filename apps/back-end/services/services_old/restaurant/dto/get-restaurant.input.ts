import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetRestaurantInput {
  @Field(() => ID)
  id: string;
}
