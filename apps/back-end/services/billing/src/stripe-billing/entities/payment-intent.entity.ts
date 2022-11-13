import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentIntent {
  @Field(() => String)
  client_secret: string;
}
