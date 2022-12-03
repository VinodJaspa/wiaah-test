import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Seller {
  @Field(() => String)
  thumbnail: string;

  @Field(() => String)
  name: string;

  @Field(() => ID)
  id: string;
}

@ObjectType()
export class OpenTime {
  @Field(() => Date)
  from: Date;

  @Field(() => Date)
  to: Date;
}
@ObjectType()
export class Localization {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  isOpen: boolean;

  @Field(() => OpenTime)
  openTime: OpenTime;

  @Field(() => String)
  propertyType: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => Seller, { nullable: true })
  seller?: Seller;

  @Field(() => String)
  thumbnail: string;

  @Field(() => String)
  city: string;
}
