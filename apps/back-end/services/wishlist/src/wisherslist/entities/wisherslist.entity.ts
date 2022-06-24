import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Wisherslist {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  itemId: string;

  @Field((type) => [Wisher])
  wishers: Wisher[];
}

@ObjectType()
export class Wisher {
  @Field((type) => String)
  wisherId: string;
}
