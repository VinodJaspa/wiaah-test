import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendContactUsMessageInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  message: string;
}
