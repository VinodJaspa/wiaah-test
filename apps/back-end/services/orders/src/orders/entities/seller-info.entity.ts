import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SellerInfo {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  shopId: string;
}
