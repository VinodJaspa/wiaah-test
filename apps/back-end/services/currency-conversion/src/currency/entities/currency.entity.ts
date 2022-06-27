import {
  ObjectType,
  Field,
  Int,
  ID,
  registerEnumType,
  Float,
} from '@nestjs/graphql';

@ObjectType()
export class Currency {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  code: string;

  @Field((type) => Float)
  exchangeRate: number;

  @Field((type) => Date)
  updatedAt: Date;
}
