import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { ServiceInsuranceStatusEnum } from 'prismaClient';

@ObjectType()
export class Insurance {
  @Field(() => ID)
  id: string;
  @Field(() => ID)
  bookId: string;
  @Field(() => ID)
  buyerId: string;
  @Field(() => ID)
  sellerId: string;
  @Field(() => Float)
  amount: number;
  @Field(() => ServiceInsuranceStatusEnum)
  status: ServiceInsuranceStatusEnum;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}
