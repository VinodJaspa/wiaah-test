import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';
import { ServiceInsuranceStatusEnum, ServiceStatus } from 'prismaClient';

@InputType()
export class GetInsurancesInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => ServiceInsuranceStatusEnum)
  status: ServiceInsuranceStatusEnum;
}
