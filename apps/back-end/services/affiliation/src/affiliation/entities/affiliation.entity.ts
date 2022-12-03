import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Product, Service } from './extends';

@ObjectType()
export class Affiliation {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => ID)
  itemId: string;

  @Field(() => String)
  itemType: string;

  @Field(() => Float)
  commision: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  expireAt: Date;

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => Service, { nullable: true })
  service?: Service;
}
