import {
  ObjectType,
  Field,
  Int,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { AffiliationStatus } from '@prisma-client';
import { Product, Service } from './extends';

registerEnumType(AffiliationStatus, { name: 'AffiliationStatus' });

@ObjectType()
export class Affiliation {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => ID)
  itemId: string;

  @Field(() => AffiliationStatus)
  status: AffiliationStatus;

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
