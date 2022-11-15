import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateBlockInput {
  @Field(() => ID)
  userId: string;
}
