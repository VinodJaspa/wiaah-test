import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Balance {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  ownerId: string;

  @Field((type) => Float)
  withdrawableBalance: number;

  @Field((type) => Float)
  pendingBalance: number;
}
