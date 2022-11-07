import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteHashtagInput {
  @Field(() => ID)
  id: string;
}
