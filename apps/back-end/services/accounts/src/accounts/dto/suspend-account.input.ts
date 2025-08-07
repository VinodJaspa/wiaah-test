// suspend-account.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SuspendAccountInput {
  @Field()
  accountId: string;
}
