import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Wisherslist {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  itemId: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => Int)
  wishersCount: number;

  @Field((type) => [Wisher])
  wishers: Wisher[];
}

@ObjectType()
export class Wisher {
  @Field((type) => String)
  userId: string;
}
