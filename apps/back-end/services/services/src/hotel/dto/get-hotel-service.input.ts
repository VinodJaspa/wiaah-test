import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetHotelServiceArgs {
  @Field(() => ID)
  id: string;
}
