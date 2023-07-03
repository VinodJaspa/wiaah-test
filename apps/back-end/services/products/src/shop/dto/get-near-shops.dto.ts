import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { StoreType } from '@prisma-client';

@InputType()
export class GetNearShopsInput {
  @Field((type) => Float)
  lat: number;

  @Field((type) => Float)
  lon: number;

  @Field((type) => Number, { nullable: true })
  distance?: number;

  @Field(() => StoreType, { nullable: true })
  storeType?: StoreType;

  @Field(() => Int, { nullable: true })
  take?: number;
}
