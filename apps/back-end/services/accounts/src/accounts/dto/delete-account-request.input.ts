import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteAccountRequestInput {
  @Field(() => String)
  reason: string;

  @Field(() => String)
  password: string;

  @Field(() => Boolean, { nullable: true })
  sendData: boolean;
}
