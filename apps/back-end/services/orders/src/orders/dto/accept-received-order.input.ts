import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AcceptReceivedOrderInput {
  @Field(() => ID)
  id: string;
}
