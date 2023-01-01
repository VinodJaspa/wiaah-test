import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';
import { ServiceInsuranceStatusEnum } from 'prismaClient';

@InputType()
class input {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => String)
  seller: string;

  @Field(() => String)
  buyer: string;

  @Field(() => String)
  service: string;

  @Field(() => ServiceInsuranceStatusEnum)
  status: ServiceInsuranceStatusEnum;

  @Field(() => Float)
  amount: number;
}

@InputType()
export class GetInsurancesHistoryInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
