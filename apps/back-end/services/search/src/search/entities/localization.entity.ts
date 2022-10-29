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
  @Field(() => Boolean)
  isOpen: boolean;

  @Field(() => OpenTime)
  openTime: OpenTime;

  @Field(() => String)
  propertyType: string;

  @Field(() => Seller)
  seller: Seller;

  @Field(() => String)
  city: string;
}
