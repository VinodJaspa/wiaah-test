import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConnectedAccountResponse {
  @Field(() => String)
  url: string;
}
